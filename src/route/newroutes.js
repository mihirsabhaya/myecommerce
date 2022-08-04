const express = require("express");

var controller = (module.exports = require("../controller/controller"));
var checksession = (module.exports = require("../controller/checksession"));
const router = new express.Router()

// module.exports = {
//   myapi: () => {
//     router.get("/", controller.home);
//     router.get("/s/:page", controller.shop);
//     router.get("/productdetail/:id",controller.productdetail);
//     router.get("/inquiry/:page", checksession.session, controller.inquirypage);
//     router.post("/deleteinquiry/:_id",checksession.session, controller.deleteinquiry);
//     router.get("/product/:page", checksession.session, controller.productpage);
//     router.get("/addProduct", checksession.session,controller.addproduct);
//     router.get("/editproduct/:_id", checksession.session, controller.editproduct );
//     router.post("/deleteproduct/:_id", checksession.session, controller.deleteproduct);
//     router.post("/tselling/:_id", checksession.session, controller.tsellingid);
//     router.post("/deletebanner/:_id", checksession.session, controller.deletebanner);
//     router.post("/deleteposter/:_id", checksession.session, controller.deleteposter);
//     router.post("/insertproduct",checksession.session, controller.insertproducts );
//     router.post("/editproductimage/:_id",checksession.session, controller.editproductimage );
//     router.post("/editproduct/:_id",checksession.session, controller.editproduct );
//     router.post("/addinquiry/:id", controller.addinquiry);
//     router.get("/banner", checksession.session, controller.getbanner);
//     router.post("/login", controller.login);
//     router.post("/addposter",checksession.session, controller.addposter);
//     router.post("/addbanner", checksession.session, controller.addbanner);
//     router.get("/admin", controller.getadmin);
//     router.get("/termsandconditions",  controller.gettermsandconditions);
//     router.get("/privacypolicy", controller.privacypolicy);
//     router.get("/about-mantradiamond",  controller.aboutmantradiamonds);
//     router.get("/contactus", controller.contactus);
//     // router.get("/index", controller.index);
//     router.get("/logout", controller.logout);
//   router.get("/myurl" , controller.myurl)


//     // router.use(function (req, res) {
//     //     res.send(
//     //       '<style>*{transition:all .6s}html{height:100%}body{font-family:Lato,sans-serif;color:#888;margin:0}#main{display:table;width:100%;height:100vh;text-align:center}.fof{display:table-cell;vertical-align:middle}.fof h1{font-size:50px;display:inline-block;padding-right:12px;animation:type .5s alternate infinite}@keyframes type{from{box-shadow:inset -3px 0 0 #888}to{box-shadow:inset -3px 0 0 transparent}}</style><div id="main"><div class="fof"><h1>Error 404, Page Not Found</h1></div></div>'
//     //     );
//     //   });
//   },

//   responseData: (file, data, res) => {
//     data["BaseUrl"] = BaseUrl;
//     return res.render(file, data);
//   },
// };

    router.get("/", controller.home);
    router.get("/s/:page", controller.shop);
    router.get("/productdetail/:id",controller.productdetail);
    router.get("/inquiry/:page", checksession.session, controller.inquirypage);
    router.post("/deleteinquiry/:_id",checksession.session, controller.deleteinquiry);
    router.get("/product/:page", checksession.session, controller.productpage);
    router.get("/addProduct", checksession.session,controller.addproduct);
    router.get("/editproduct/:_id", checksession.session, controller.editproduct );
    router.post("/deleteproduct/:_id", checksession.session, controller.deleteproduct);
    router.post("/tselling/:_id", checksession.session, controller.tsellingid);
    router.post("/deletebanner/:_id", checksession.session, controller.deletebanner);
    router.post("/deleteposter/:_id", checksession.session, controller.deleteposter);
    router.post("/insertproduct",checksession.session, controller.insertproducts );
    router.post("/editproductimage/:_id",checksession.session, controller.editproductimage );
    router.post("/editproduct/:_id",checksession.session, controller.editproduct );
    router.post("/addinquiry/:id", controller.addinquiry);
    router.get("/banner", checksession.session, controller.getbanner);
    router.post("/login", controller.login);
    router.post("/addposter",checksession.session, controller.addposter);
    router.post("/addbanner", checksession.session, controller.addbanner);
    router.get("/admin", controller.getadmin);
    router.get("/termsandconditions",  controller.gettermsandconditions);
    router.get("/privacypolicy", controller.privacypolicy);
    router.get("/about-mantradiamond",  controller.aboutmantradiamonds);
    router.get("/contactus", controller.contactus);
    // router.get("/index", controller.index);
    router.get("/logout", controller.logout);
  router.get("/myurl" , controller.myurl)

module.exports =  router;
