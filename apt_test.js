
get localhost:4000/api/orderDetail/

//"orderDetail_NO": 1000,
get localhost:4000/api/orderDetail/1000

post localhost:4000/api/orderDetail/65781e7c32113d5b10efb34f => product_id
delete localhost:4000/api/orderDetail/6585ab851e75c43c43ce6a8a => _id  food.orderdetails._id
{
    "orderDetail_NO": 1000,
    "productname": "computer CPU AMD",
    "price": "1501",
    "quanlity": "1",
    "discount": "100",
    "toppings": ["case","hp"]
} 
localhost:4000/api/orderDetail/6576b7c0885e9193e9ad9255   => _id product_id

createOrder
post localhost:4000/api/billorder

endbillorder
post  localhost:4000/api/billorder/6586e6296ba66cee28e55754




const date = new Date();
const today = new  Date(date.getFullYear(),date.getMonth(),date.getDate())
db.getCollection("orderdetails").aggregate([
{
    $match:{
        
        createdAt:{
            $gte: today,
            
        },
        
    }
},{
    
           $group :{
            _id:null,
            totalSale:{
                $sum:"$price"
            }
            
        }
}
])


db.getCollection("orderdetails").find({billorder_id:{$in:["658797a6439e955d5308b3d0"]}})


echo "# backend_ecom_adddatabase" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/case2500/backend_ecom_adddatabase.git
git push -u origin main