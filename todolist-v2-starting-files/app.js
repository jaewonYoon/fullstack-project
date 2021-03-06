//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const lodash = require("lodash");
const date = require(__dirname + "/date.js");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-jaewon:test123@cluster0-ehw4p.mongodb.net/todolistDB",{useNewUrlParser: true});

//mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});
//schema를 만들고 만든 스키마로 collection을 만든다.
const itemsSchema ={
    name:String,
};
//const Item은 하나의 collection이다.
//show collections를 하면 디비에서는 Items라는 복수로 뜨게 된다. 
const Item = mongoose.model("Item",itemsSchema);

const Item1 = new Item({
    name:"welcome to your todolist", 
});
const Item2 = new Item({
    name:"Hit the + button to add your item.", 
});
const Item3 = new Item({
    name:"<-- Hit this to delete item.",
})

const defaultItems = [Item1, Item2, Item3];
const listSchema = {
    name: String,
    items: [itemsSchema]
};

//create mongoose object Lists라는 이름의 collection을 만든거다. model 
const List = mongoose.model("List",listSchema);

//Item.insertMany(defaultItems, function(err){
//    if(err){
//        console.log(err);
//    }else {
//        console.log("Successfully saved default item to DB");
//    }
//});

app.get("/", function(req, res) {

  Item.find( //find 메소드의 foundItems 는 베열로 리턴된다.
    {},function(err,foundItems){
        
        if(err) console.log(err);
        else{
            if(foundItems.length ===0){
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                }else {
                    console.log("Successfully saved default item to DB");
                    }
                });
                res.redirect("/");
            }else{
                res.render("list", {listTitle: "Today", newListItems: foundItems});
            }
        }
    });
});
app.get("/:customListName", function(req,res){
    let customListName = req.params.customListName;
    customListName = lodash.lowerCase(customListName);
    customListName = lodash.kebabCase(customListName);
    customListName = lodash.capitalize(customListName);
    List.findOne({name: customListName},function(err,results){
        if(err){
            console.log(err);
        }else{
            if(!results){
                console.log("collection Doesn't Exists!");
                //conllection을 새로 만든다.
                const list = new List({
                    name: customListName,
                    items: defaultItems,
                });
                list.save();
                res.redirect("/"+customListName);
            }else{
                console.log("collection has been made before. Exists!");
                res.render("list",{listTitle:customListName, newListItems: results.items});
            }
        }
        
      }); //end of find function.. 
        
    });
    
//add item
app.post("/", function(req, res){
  const ItemName  = req.body.newItem;
  const listName = req.body.list;
  console.log(listName);
  const item =  new Item({
        name: ItemName,
  });
  if(listName==="Today"){    
      item.save();
      res.redirect("/");
  }else{
      List.findOne({name:listName},function(err,foundList){
          console.log(foundList);
      if(!err){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/"+listName);
      } else{
          console.log(err);
      }
    });
  }
});

//app.post("/:customListName", function(req,res){
//    const customListName = req.params.customListName;
//    
//});



//delete item 
app.post("/delete",function(req,res){
   const checkedItemId = req.body.checkbox; 
   const listName= req.body.listName;
    
    if(listName==="Today"){
        Item.findByIdAndRemove(checkedItemId,function(err){
       if(err){
           console.log(err);
       }else{
           console.log("Item "+checkedItemId+"has removed successfully");
           res.redirect('/');
       }
   });
    } else{
        List.findOneAndUpdate({name:listName},{$pull: {items: {_id : checkedItemId}}}, function(err,foundItem){
            if(err){
                console.log(err);
            } else{ 
            console.log("Item "+checkedItemId+" has removed successfully");
            console.log(foundItem.items);
            foundItem.save(); 
            res.redirect('/'+listName);    
            }
            });
        }
    });
app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});
let port = process.env.PORT;
if( port ==null || port ==""){
    port =3000; 
}
app.listen(port, function() {
  console.log("Server started successfully");
});
