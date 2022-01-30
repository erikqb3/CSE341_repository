// const products = [];
const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

// class Product { //KEEP THIS
//   constructor(ID, Title, imageURL, Price, Description) {
//     this._id = ID ? new mongodb.ObjectId(ID):null;
//     this.title = Title;
//     this.imgURL = imageURL;
//     this.price = Price;
//     this.descipt = Description;
//   }

//   save() {
//     if (this._id) {
//       //Update the product
//       dbOp = db //database Operation
//         .collection("prodcuts")
//         .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this});
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(results);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     };
//     // const database = getDB();
//     // return database.collection('products') //if collections doesn't exist, it will be created automatically
//     //   .insertOne(this) // we want to insert product into database
//     //   .then(result => {
//     //     console.log(result, "RESULT, Product_moedule.js, 17");
//     //   })
//     //   .catch(err => {
//     //     console.log(err);
//     //   });


//   static fetChAll() {
//     return db
//     .collection('products')
//     .find()
//     .toArray()
//     .then( products => {
//       console.log(products, "PRODUCTS, product_model/111");
//       return products;
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//     .collection('products')
//     .find({_id: new mongodb.ObjectId(prodId)}) //Mongodb uses _id and ObejectId
//     .next()
//     .then(product => {
//       console.log(product, "PRODUCT, product_model.js/46");
//       return product;
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     db.collection('products')
//     .deleteOne({ _id: new mongodb.ObjectId(prodId)})
//     .then(result => {
//       console.log("DELETED, product_model.js/76")
//     })
//     .catch(err => {
//       console.log(err)
//     });
//   }
// }

const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const Cart = require('./cart_model')


const p = path.join( //have a global so all functions have access
  rootDir,
  'data',
  'products_data.json'
);


const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });

}

module.exports = class Product {
  constructor(ID, Title, imageURL, Price, Description) {
    // this._id = ID ? new mongodb.ObjectId(ID):null;
    this.id = ID;
    this.title = Title;
    this.imgURL = imageURL;
    this.price = Price;
    this.descipt = Description;
  }


  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [ ...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      }
      else {
        this.id = Math.random().toString();//Adds id property to item, Math.random --> dummy id
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      // console.log(products, "PRODUCTS, product_model.js/83")
      const product = products.find(prod => prod.id === id)
      // console.log(product, "PRODUCT, product_model/85");
      console.log(id, "ID, product_models.js/86");
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          // console.log(product, "PRODUCT, product_model/90")
          Cart.deleteProduct(id, product.price);
        }
      });
      }); 
  }

// static fetchAll() {
  // return products;

  //OLD
static fetchAll(cb) { //fetchAll is asynchronous, cb, allows to  pass function into fetch all which fetchall will execute when it is done, so that the thing calling fetchalALL can pass of faction it is then being awa
    getProductsFromFile(cb);
  }

// static fetChAll() {
//   return db
//   .collection('products')
//   .find()
//   .toArray()
//   .then( products => {
//     console.log(products, "PRODUCTS, product_model/111");
//     return products;
//   })
//   .catch(err => {
//     console.log(err);
//   })
// }

static findById(id,cb) { //cb is anyfunction we need to use, dont' konw name, but still use
  getProductsFromFile(products=> {
    const product = products.find(p => p.id === id);
    cb(product)
    }); //searches for elements and finds the p elements
  };
};





















// const fs = require('fs');
// const path = require('path');

// const getProductsFromFile = cb => {

// }


// module.exports = class Product {
//   constructor(Title) {
//     this.title = Title;
//   }

//   save() {
//     const p = path.join(
//       path.dirname(require.main.filename),
//       'data',
//       'products.json'
//     );
//     fs.readFile(p, (err, fileContent) => {
//       let products = [];
//       console.log(products, "PRODUCTS_ARRAY")
//       if (!err) {
//         products = JSON.parse(fileContent);
//       }
//       products.push(this);
//       fs.writeFile(p, JSON.stringify(products), (err) => {
//         console.log(err);
//       });
//     });
//   };


//   static fetchAll() {
//     return products;
//   }
//   // static fetchAll(cb) { //static, allows you to call fetchAll method directly on Product class itself
//   //   const p = path.join(
//   //     // path.dirname(process.mainModule.filename), //works for videoguy but not me
//   //     path.dirname(require.main.filename),
//   //     'data',
//   //     'products.json'
//   //   );
//   //   fs.readFile(p, (err, fileContent) => {
//   //     if (err) {
//   //       cb([]); //callback allows to pass function within fetchAll function
//   //     }
//   //     console.log(err);
//   //     console.log(fileContent, "FILECONTENT?")
//   //     cb(JSON.parse(fileContent));
//   //   })
//   // }
// }

















// // const products = [];
// const fs = require('fs') //file system
// const path = require('path');

// const products = [];

// module.exports = class Product {
//   constructor(Title) { //find shape of product, TItle created inside controller
//     this.title = Title;
//   };

//   save() {
//     // products.push(this); //this = object created by the class
//       const p = path.join(
//       path.dirname(process.main.filename),
//       '../data', //data folder
//       'products.json' //should create products.json {}
//     );
//     fs.readFile(p, (err, fileContent) => {
//       console.log("HELP")
//       let products = [];
//       console.log(products);
//       if (!err) { //if no errro
//         products = JSON.parse(fileContent);
//       }
//       products.push(this);
//       console.log(products);
//       fs.writeFile(p, JSON.stringify(products), (err) => {
//         console.log(err);
//       })
//     }); //read p path from above, and return either error or fileContent
//   };


//   static fetchAll() {
//   // static fetchAll(cb) { //static, allows you to call fetchAll method directly on Product class itself
//     return products;
  
  
//     //   const p = path.join(
//   //     path.dirname(process.main.filename), //IMPORTANT mainModel is deprecated, use main instead
//   //     'data', //data folder
//   //     'products.json' //should create products.json {}
//   //   );
//   //   console.log("HELLOW", p, "PATH")
//   //   fs.readFile(p, (err, fileContent) => {
//   //     if (err) {
//   //       // return [];
//   //       cb([]);
//   //     }
//   //     // console.log(fileContent)
//   //     // return JSON.parse(fileContent);
//   //     cb(JSON.parse(fileContent));
//   //   });
//   //   // return products;
//   };
// }



































// const fs = require('fs');
// const path = require('path');

// const getProductsFromFile = cb => {

// }


// module.exports = class Product {
//   constructor(Title) {
//     this.title = Title;
//   }

//   save() {
//     const p = path.join(
//       path.dirname(process.mainModule.filename),
//       'data',
//       'products.json'
//     );
//     fs.readFile(p, (err, fileContent) => {
//       let products = [];
//       if (!err) {
//         products = JSON.parse(fileContent);
//       }
//       products.push(this);
//       fs.writeFile(p, JSON.stringify(products), (err) => {
//         console.log(err);
//       });
//     });
//   };

//   static fetchAll(cb) { //static, allows you to call fetchAll method directly on Product class itself
//     const p = path.join(
//       path.dirname(process.mainModule.filename),
//       'data',
//       'products.json'
//     );
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         cb([]); //callback allows to pass function within fetchAll function
//       }
//       cb(JSON.parse(fileContent));
//     })
//   }
// }






// const products = []; we want to save to a file, not an array

// const fs = require('fs'); //file system
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'date',
//   'products.json');

// const getProductsFromFile = (cb) => {
//  //temporary
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       return cb([]);
//     }
//     cb(JSON.parse(fileContent));
//   });
// };


// module.exports = class Product {
//   constructor(Title) {
//     this.title = Title;
//   }

//   save() {
//     getProductsFromFile(products => {
//       products.push(this);
//       fs.writeFile(p, JSON.stringify(products), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static fetchAll(cb) { //static makes it so you can call fetchAll method directly on the class Product itself
//     getProductsFromFile(cb);
//   }
// };
    


  //   getProductsFromeFile();
  //   const p = path.join(
  //     path.dirname(process.mainModule.filename),
  //     'date',
  //     'products.json');
  //     fs.realFile(p, (err, fileContent) => {
  //       let products = []
  //       products.push(this);
  //       // fs.writeFile(p, JSON.stringify(products), (err) => {
  //       //   console.log(err);
  //       // });
  //     });
  // }

  // static fetchAll(cb) { //callback, will call back to fetchAll function in products.js
  //   getProductsFromFile(cb);
    
    // const p = path.join(
    //   path.dirname(process.mainModule.filename),
    //   'date',
    //   'products.json'); //temporary
    // fs.readFile(p, (err, fileContent) => {
    //   if (err) {
    //     cb([]);
    //   }
    //   cb(JSON.parse(fileContent));
    // });
//   }
// }