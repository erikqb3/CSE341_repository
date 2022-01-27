// const products = [];

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
  constructor(ID, Title, ImageURL, Description, Price) {
    this.id = ID;
    this.title = Title;
    this.imgURL = ImageURL;
    this.descript = Description;
    this.price = Price;
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
    getProductsFromFile(products=> {
      const product = products.find(prod => prod.id === id)
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
      }); 
  }

// static fetchAll() {
  // return products;

static fetchAll(cb) { //fetchAll is asynchronous, cb, allows to  pass function into fetch all which fetchall will execute when it is done, so that the thing calling fetchalALL can pass of faction it is then being awa
    getProductsFromFile(cb);
  }

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