document.getElementById("searchProduct").setAttribute("style","visibility:hidden");
document.getElementById("searchResult").setAttribute("style","visibility:hidden");
document.getElementById("checkout").setAttribute("style","visibility:hidden");
var arr;
arr=JSON.parse(localStorage.getItem('1'));
var crr;
crr=JSON.parse(localStorage.getItem('2'));
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var aAddProduct = document.getElementById("aAddProduct");
var pArray=[];
var pId=1;
var cArray=[];
var cId=1;
console.log(arr);
console.log(pArray);
/*var xhttp=new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };*/
displayCart.addEventListener("click",function(event)
{
	document.getElementById("cart").style.visibility="visible";
	document.getElementById("checkout").style.visibility="visible";
});
checkout.addEventListener("click",function(event)
{
	var i;
	var total=0;
	for(i=0;i<cArray.length;i++)
	{
		total=total+cArray[i].qty*cArray[i].price;
	}
totalBill.innerHTML=total;
});
btnSearch.addEventListener("click",function(event)
{
	document.getElementById("searchResult").setAttribute("style","visibility:visible");
	var id=document.getElementById("inputSearch").value;
	var c=0;
	for(var i=0;i<pArray.length;i++)
	{
		if(pArray[i].Id==id)
		{
			var c=1;
			document.getElementById("p1").innerHTML=pArray[i].name;
			space(searchResult);
			document.getElementById("p2").innerHTML=pArray[i].desc;
		}
	}
	if(c==0)
	{
			document.getElementById("p1").innerHTML="No such Product";
			document.getElementById("p2").innerHTML="";
	}

});
if(arr==null)
{
	console.log('aa');
	pId=1;
}
else
{
	var i;
	for(i=0;i<arr.length;i++)
	{
		displayProduct(arr[i]);
	}
	pArray=arr;
	if(i!=0)
	pId=pArray[i-1].Id+1;
else
	pId=1;
	
}
if(crr)
{
	for(var i=0;i<crr.length;i++)
	{
		addToCart(crr[i]);
	}
	cId=crr.length+1;
	cArray=crr;
}
console.log(pArray);
aAddProduct.addEventListener("click",function(event)
{
	createForm();
}
);
function createForm()
{
	hideElement();
	document.getElementById("searchProduct").setAttribute( "style","visibility:hidden");
	document.getElementById("searchResult").setAttribute("style","visibility:hidden");
	var addNewProduct=document.createElement("p");
	addNewProduct.innerHTML="ADD NEW PRODUCT";
	addNewProduct.style.color="red";
	divAddProduct.appendChild(addNewProduct);
	var pName=document.createElement("input");
	pName.setAttribute("type","text");
	pName.setAttribute("id","pname");
	pName.setAttribute("placeholder","Enter The Product Name");
	divAddProduct.appendChild(pName);
	space(divAddProduct);
	space(divAddProduct);
	var pDesc=document.createElement("textarea");
	pDesc.setAttribute("id","pdesc");
	pDesc.setAttribute("rows","3");
	pDesc.setAttribute("cols","50");
	pDesc.setAttribute("placeholder","Enter The Product Description");
	divAddProduct.appendChild(pDesc);
	space(divAddProduct);
	space(divAddProduct);
	var pPrice=document.createElement("input");
	pPrice.setAttribute("id","pprice");
	pPrice.setAttribute("type","text");
	pPrice.setAttribute("placeholder","Enter The Product Price");
	divAddProduct.appendChild(pPrice);
	space(divAddProduct);
	space(divAddProduct);
	var pQuantity=document.createElement("input");
	pQuantity.setAttribute("id","pquantity");
	pQuantity.setAttribute("type","text");
	pQuantity.setAttribute("placeholder","Enter The Product Quantity");
	divAddProduct.appendChild(pQuantity);
	space(divAddProduct);
	space(divAddProduct);
	var bAddProduct=document.createElement("button");
	bAddProduct.setAttribute("id","btn");
	bAddProduct.innerHTML="ADD PRODUCT";
	divAddProduct.appendChild(bAddProduct);
	bAddProduct.addEventListener("click",function(event)
		{
			addToList();
		});
}
function addToList()
{
	var obj=new Object();
	obj.Id=pId;
	obj.name=document.getElementById("pname").value;
	obj.desc=document.getElementById("pdesc").value;
	obj.price=document.getElementById("pprice").value;
	obj.qty=document.getElementById("pquantity").value;
	pArray.push(obj); 
	var str=JSON.stringify(pArray);
	localStorage.setItem("1",str);
	
	/*xhttp.open("POST", "/product");
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(obj));*/

	displayProduct(obj);
	deleteForm();
	unhideElement();
	pId++;


}
function displayProduct(obj1)
{
	document.getElementById("searchProduct").setAttribute("style","visibility:visible");
	var divNew=document.createElement("div");
	divNew.setAttribute("id",obj1.Id);
	var d1=document.createElement("p");
	d1.innerHTML=obj1.name;
	divNew.appendChild(d1);
	var d2=document.createElement("p");
	d2.innerHTML=obj1.desc;
	divNew.appendChild(d2);
	var x1=document.createElement("p");
	x1.innerHTML=obj1.price;
	divNew.appendChild(x1);
	var x2=document.createElement("p");
	x2.innerHTML=obj1.qty;
	divNew.appendChild(x2);
	space(divNew);
	var b=document.createElement("button");
	b.innerHTML="DELETE";
	var c=document.createElement("button");
	c.innerHTML="EDIT";
	var d=document.createElement("button");
	d.innerHTML="ADD TO CART";
	divNew.appendChild(b);
	divNew.appendChild(c);
	divNew.appendChild(d);
	if(obj1.qty==0)
				{
					d.disabled=true;
					console.log("abcdefgh");
				}
				else
				{
					d.disabled=false;
				}

	d.addEventListener("click",function(event)
	{
		var productObj=event.target.parentNode;
		var s=getId(parseInt(productObj.id));
		var flag=0;
		for(var i=0;i<cArray.length;i++)
		{

			if((cArray[i].name)==(pArray[s].name))
			{
				console.log("@");
				cArray[i].qty++;
				pArray[s].qty--;
				
				localStorage.setItem("2",JSON.stringify(cArray));
			    localStorage.setItem("1",JSON.stringify(pArray));
				flag=1;
				break;
			}
		}
		if(flag==0)
		{
			cArray.push(JSON.parse(JSON.stringify(pArray[s])));
			cArray[cArray.length-1].qty=1;
			pArray[s].qty=parseInt(pArray[s].qty)-1;
			localStorage.setItem("2",JSON.stringify(cArray));
			localStorage.setItem("1",JSON.stringify(pArray));
			addToCart(cArray[cArray.length-1]);
		}
		document.location.reload();
	});

	c.addEventListener("click",function(event)
	{
		document.getElementById("searchProduct").setAttribute("style","visibility:hidden");
		document.getElementById("searchResult").setAttribute("style","visibility:hidden");
		document.getElementById("divAddProduct").setAttribute("style","visibility:hidden");
		document.getElementById("divListProducts").setAttribute("style","visibility:hidden");
		document.getElementById("aAddProduct").setAttribute("style","visibility:hidden");
		document.getElementById("listOfProducts").setAttribute("style","visibility:hidden");

		var productObj=event.target.parentNode;
		var selectedProductId=getId(parseInt(productObj.id));
		console.log(selectedProductId);
		openEditForm(selectedProductId);
	});


	b.addEventListener("click",function(event)
	{
		var productObj=event.target.parentNode;
		var selectedProductId=getId(parseInt(productObj.id));
		//console.log(selectedProductId);
		deleteFromArray(selectedProductId);
		productObj.parentNode.removeChild(productObj);
		if(pArray.length==0)
		{
			pId=1;
		}
	});
divListProducts.appendChild(divNew);
}

function addToCart(obj2)
{
	var newDiv=document.createElement("div");
	newDiv.setAttribute("id",obj2.Id);
	var d3=document.createElement("p");
	d3.innerHTML=obj2.name;
	newDiv.appendChild(d3);
	var d4=document.createElement("p");
	d4.innerHTML=obj2.desc;
	newDiv.appendChild(d4);
	var d5=document.createElement("p");
	d5.innerHTML=obj2.qty;
	newDiv.appendChild(d5);
	document.getElementById("cart").style.visibility="hidden";
	var del=document.createElement("button");
	del.innerHTML="Delete From Cart";
	newDiv.appendChild(del);
	cart.appendChild(newDiv);
	del.addEventListener("click",function()
	{
		var productObj=event.target.parentNode;
		var s=getCId(parseInt(productObj.id));
		var flag=0;
		console.log(s);
		for(var i=0;i<pArray.length;i++)
		{

			if((pArray[i].name)==(cArray[s].name))
			{
				console.log("@");
				pArray[i].qty++;
				cArray[s].qty--;
				localStorage.setItem("2",JSON.stringify(cArray));
			    localStorage.setItem("1",JSON.stringify(pArray));
				flag=1;
				break;
			}
		}
		/*if(flag==0)
		{
			//console.log("#");
			pArray.push(JSON.parse(JSON.stringify(cArray[s])));
			//console.log(pArray[s]);
			pArray[pArray.length-1].qty=1;
			//console.log(cArray);
			cArray[s].qty=parseInt(cArray[s].qty)-1;
			localStorage.setItem("2",JSON.stringify(cArray));
			localStorage.setItem("1",JSON.stringify(pArray));
			//addToCart(cArray[cArray.length-1]);
			displayProduct(pArray[pArray.length-1]);
		}*/
		if(cArray[s].qty<=0)
		{
			productObj.parentNode.removeChild(productObj);
			deleteFromcArray(s);
		}
		document.location.reload();
	});


}
function openEditForm(i)
{	
	var eName=pArray[i].name;
	var eDesc=pArray[i].desc;
	var ePrice=pArray[i].price;
	var eQty=pArray[i].qty;
	document.getElementById("editProductForm").innerHTML="Edit Product Form";
	var editProduct=document.getElementById("editProduct");
	var pName=document.createElement("input");
	pName.setAttribute("type","text");
	pName.setAttribute("id","pname");
	pName.setAttribute("value",eName);
	editProduct.appendChild(pName);
	space(editProduct);
	space(editProduct);
	var pDesc=document.createElement("textarea");
	pDesc.setAttribute("id","pdesc");
	pDesc.setAttribute("rows","3");
	pDesc.setAttribute("cols","50");
	pDesc.value=eDesc;
	editProduct.appendChild(pDesc);
	space(editProduct);
	space(editProduct);
	var pPrice=document.createElement("input");
	pPrice.setAttribute("id","pprice");
	pPrice.setAttribute("type","text");
	pPrice.setAttribute("value",pArray[i].price);
	editProduct.appendChild(pPrice);
	space(editProduct);
	space(editProduct);
	var pQuantity=document.createElement("input");
	pQuantity.setAttribute("id","pquantity");
	pQuantity.setAttribute("type","text");
	pQuantity.setAttribute("value",pArray[i].qty);
	editProduct.appendChild(pQuantity);
	space(editProduct);
	var save=document.createElement("button");
	save.id="saveid";
	save.innerHTML="save";
	editProduct.appendChild(save);
	save.addEventListener("click",function(event)
	{
		var itemChange=event.target.parentNode;
		saveChanges(itemChange,i);
	});
}
function saveChanges(ele,i)
{
	pArray[i].name=ele.childNodes[0].value;
	pArray[i].desc=ele.childNodes[3].value;
	pArray[i].price=ele.childNodes[6].value;
	pArray[i].qty=ele.childNodes[9].value;
	localStorage.setItem('1',JSON.stringify(pArray));
	var str=localStorage.getItem('1');
	pArray=str;

	document.getElementById("searchProduct").setAttribute("style","visibility:visible");
		document.getElementById("searchResult").setAttribute("style","visibility:visible");
		document.getElementById("divAddProduct").setAttribute("style","visibility:visible");
		document.getElementById("divListProducts").setAttribute("style","visibility:visible");
		document.getElementById("aAddProduct").setAttribute("style","visibility:visible");
		document.getElementById("listOfProducts").setAttribute("style","visibility:visible");
		document.location.reload();

}
function getCId(id)
{
	for(var i=0;i<cArray.length;i++)
	{
		if(cArray[i].Id==id)
		{
			return i;
		}
	}
}

function getId(id)
{
	for(var i=0;i<pArray.length;i++)
	{
		if(pArray[i].Id==id)
		{
			return i;
		}
	}
}
function deleteFromcArray(i)
{
	cArray.splice(i,1);
	localStorage.setItem("2",JSON.stringify(cArray));
}
function deleteFromArray(i)
{
	pArray.splice(i,1);
	localStorage.setItem('1',JSON.stringify(pArray));
}
function deleteForm()
{
	var childNodes = divAddProduct.childNodes;
   for (var i = 0; childNodes.length > 0;) 
   {
     divAddProduct.removeChild(childNodes[i]);
   }
}
function hideElement()
{
	document.getElementById("aAddProduct").setAttribute("style","visibility:hidden");
	
}
function unhideElement()
{
	document.getElementById("aAddProduct").setAttribute("style","visibility:visible");
}
function space(spacex)
{
	var br=document.createElement("br");
	spacex.appendChild(br);
}