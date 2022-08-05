// const index = async (req , res) =>{
//   try {
//     console.log("hiii");
//   } catch (e) {
//     log(e)
//   }
// }


exports.home = async (req, res, next) => {
  try {
    const product = await db
      .collection("product")
      .find({ firstpageshow: "checked" })
      .toArray();
    const banner = await db.collection("banner").find().toArray();
    const banner_image = await db.collection("banner");

    for (let i = 0; i < product.length; i++) {
      for (let k = 0; k < product[i].image.length; k++) {
        product[i].image[k] =
          BaseUrl + "/user/image/" + product[i].image[k];
      }
    }
    var bottom_posters = await db
      .collection("poster")
      .find()
      .limit(1)
      .toArray();

    var data = {
      product: product,
      banner: banner,
      bottomposter: bottom_posters,
    };
    console.log(data)

    return route.responseData("user/index.html", data, res);
    //   return responseData("user/index.html", data, res);
  } catch (e) {
    return route.responseData("user/index.html", {}, res);
    //   return responseData("user/index.html", {}, res);
  }
};

exports.shop = (req, res, next) => {
  var perPage = 12;
  var page =
    typeof req.params.page != "undefined"
      ? req.params.page == 0
        ? 1
        : req.params.page || 1
      : 1;
  var skip = perPage * page - perPage;
  var limit = "LIMIT " + skip + ", " + perPage;
  db.collection("product").countDocuments((err, userCount) => {
    db.collection("product")
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(perPage)
      .toArray((err, result) => {
        for (let i = 0; i < result.length; i++) {
          for (let k = 0; k < result[i].image.length; k++) {
            result[i].image[k] =
              BaseUrl + "/user/image/" + result[i].image[k];
          }
        }

        data = {
          product: result,
        };

        data["search"] = {};
        data["current"] = page;
        data["pages"] = Math.ceil(userCount / perPage);
        //   responseData("user/item.html", data, res);
        return route.responseData("user/item.html", data, res);
      });
  });
};

exports.productdetail = async (req, res) => {
  try {
    var productdata = await db
      .collection("product")
      .findOne({ _id: objectId(req.params.id), deleted: 0 });
    var allproductdata = await db
      .collection("product")
      .find()
      .limit(8)
      .toArray();
    // console.log(allproductdata);

    var data = {
      data: productdata,
      allproduct: allproductdata,
    };

    // console.log(data);
    route.responseData("user/productdetail.html", data, res);
  } catch (e) {
    console.log(e);
  }
};

exports.inquirypage = (req, res) => {
  var perPage = 10;
  var page =
    typeof req.params.page != "undefined"
      ? req.params.page == 0
        ? 1
        : req.params.page || 1
      : 1;
  var skip = perPage * page - perPage;
  var limit = "LIMIT " + skip + ", " + perPage;
  db.collection("inquiry").countDocuments((err, userCount) => {
    db.collection("inquiry")
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(perPage)
      .toArray((err, result) => {
        data = {
          data: result,
        };
        data["search"] = {};
        data["current"] = page;
        data["pages"] = Math.ceil(userCount / perPage);
        console.log(data);

        db.collection("product").find;
        console.log(data);
        route.responseData("adminPanel/inquiry.html", data, res);
      });
  });
};

exports.deleteinquiry = (req, res) => {
  db.collection("inquiry").deleteOne(
    { _id: objectId(req.params._id) },
    (err, rows) => {
      // console.log("id deleted succeessfully")
      res.redirect("/inquiry/1");
    }
  );
};

exports.productpage = (req, res) => {
  var perPage = 10;
  var page =
    typeof req.params.page != "undefined"
      ? req.params.page == 0
        ? 1
        : req.params.page || 1
      : 1;
  var skip = perPage * page - perPage;
  var limit = "LIMIT " + skip + ", " + perPage;
  db.collection("product").countDocuments((err, userCount) => {
    db.collection("product")
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(perPage)
      .toArray((err, result) => {
        for (let i = 0; i < result.length; i++) {
          for (let k = 0; k < result[i].image.length; k++) {
            result[i].image[k] =
              BaseUrl + "/user/image/" + result[i].image[k];
          }
        }
        data = {
          data: result,
        };
        data["search"] = {};
        data["current"] = page;
        data["totalproduct"] = userCount;
        data["pages"] = Math.ceil(userCount / perPage);

        route.responseData("adminPanel/product.html", data, res);
      });
  });
};

exports.addproduct = (req, res) => {
  db.collection("category")
    .find({})
    .toArray((err, result) => {
      db.collection("pcategory")
        .find({})
        .toArray((err, result2) => {
          // console.log("result2 :-" + result2);
          var data = {
            data: result,
            data2: result2,
          };
          console.log(data)
          return route.responseData("adminPanel/addproduct.html", data, res);
        });
    });
};

exports.editproduct = (req, res) => {
  if (!objectId.isValid(req.params._id)) {
    return res.redirect("/product/1");
  } else {
    db.collection("product").findOne(
      { _id: objectId(req.params._id) },
      (err, result3) => {
        for (let k = 0; k < result3.image.length; k++) {
          result3.image[k] = BaseUrl + "/user/image/" + result3.image[k];
        }

        data = {
          data: result3,
          error: true,
        };
        return route.responseData("adminPanel/editproduct.html", data, res);
      }
    );
  }
};

exports.deleteproduct = (req, res) => {
  db.collection("product").findOne(
    { _id: objectId(req.params._id) },
    (err1, findproduct) => {
      for (var i = 0; i < findproduct.image.length; i++) {
        const imagepath = "views/jewellery/image/" + findproduct.image[i];
        fs.unlink(imagepath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

      const videopath = "views/jewellery/video/" + findproduct.video;
      fs.unlink(videopath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      db.collection("product").findOneAndDelete(
        { _id: objectId(req.params._id) },
        (err2, rows) => {
          res.redirect("/product/1");
        }
      );
    }
  );
};

exports.tsellingid = (req, res) => {
  db.collection("product").findOne(
    { _id: objectId(req.params._id) },
    (err, result) => {
      if (result.firstpageshow == "checked") {
        var item = {
          firstpageshow: "0",
        };
        db.collection("product").updateOne(
          { _id: objectId(req.params._id) },
          { $set: item }
        );
      } else {
        var item = {
          firstpageshow: "checked",
        };
        db.collection("product").updateOne(
          { _id: objectId(req.params._id) },
          { $set: item }
        );
      }
    }
  );
};

exports.deletebanner = (req, res) => {
  db.collection("banner").deleteOne(
    { _id: objectId(req.params._id) },
    (err, rows) => {
      // console.log("id deleted succeessfully")
      res.redirect("/banner");
    }
  );
};

exports.deleteposter = (req, res) => {
  db.collection("poster").deleteOne(
    { _id: objectId(req.params._id) },
    (err, rows) => {
      // console.log("id deleted succeessfully")
      res.redirect("/banner");
    }
  );
};

exports.insertproducts = (req, res) => {
  var data = req.body;
  var multiImg = [];
  console.log(req.files);
  var pfile = req.files.pdf;
  if (pfile) {
    var pdf_name = Date.now() + "_" + pfile.name;
    if (pfile.mimetype == "application/pdf") {
      pfile.mv("views/user/video/" + pdf_name, function (err) {
        if (err) return res.status(500).send(err);
        addData();
      });
    }
  } else {
    addData();
  }

  function addData() {
    var file = req.files.uploaded_image;
    if (!Array.isArray(file)) {
      file = [file];
    }

    function addImg(file, i, done) {
      var img_namess = Date.now() + "_" + file[i].name;
      var img_name = img_namess.trim();

      if (
        file[i].mimetype == "image/jpeg" ||
        file[i].mimetype == "image/svg+xml" ||
        file[i].mimetype == "image/png" ||
        file[i].mimetype == "image/jpg"
      ) {
        file[i].mv("views/user/image/" + img_name, function (err) {
          if (err) return res.status(500).send(err);
        });
        multiImg.push(img_name);
        if (typeof file[++i] != "undefined") {
          addImg(file, i, done);
        } else {
          return done();
        }
      }
    }

    addImg(file, 0, (done) => {
      insertdata = {
        name: data.name,
        price: parseFloat(data.price),
        description: data.description, toString,
        image: multiImg,
        pdf: pdf_name,
        firstpageshow: 0,
        deleted: 0,
        date: new Date(),
      };
      db.collection("product").insertOne(insertdata);
      res.redirect("/addProduct");
    });
  }
};


exports.editproductimage = (req, res) => {
  var data = req.body;

  var multiImg = [];
  var file = req.files.uploaded_image;
  if (!Array.isArray(file)) {
    file = [file];
  }
  for (var i = 0; i < file.length; i++) {
    var img_namess = Date.now() + "_" + file[i].name;

    var img_name = img_namess.trim();
    console.log(img_name);
    if (
      file[i].mimetype == "image/jpeg" ||
      file[i].mimetype == "image/png" ||
      file[i].mimetype == "image/jpg"
    ) {
      file[i].mv("views/user/image/" + img_name, function (err) {
        if (err) return res.status(500).send(err);
      });

      var img_names = {
        img: img_name,
      };

      multiImg.push(img_names);
    }
  }

  var multipleImg = [];
  for (var i = 0; i < multiImg.length; i++) {
    multipleImg.push(multiImg[i].img);
  }

  db.collection("product").updateOne(
    { _id: objectId(req.params._id) },
    { $push: { image: { $each: multipleImg } } },
    (req, result) => {
      res.redirect("/product/1");
    }
  );
};

exports.editproduct = (req, res) => {
  var data = req.body;

  var item = {
    name: data.name,
    price: data.price,
    description: data.description,
    last_updated: new Date(),
  };
  db.collection("product").updateOne(
    { _id: objectId(req.params._id) },
    { $set: item },
    function (err, result20) {
      res.redirect("/product/1");
    }
  );
};

exports.addinquiry = async (req, res) => {
  try {
    var _id = req.params.id;
    var data = req.body;
    var item = {
      contactname: data.consumer_name,
      mobile: data.consumer_number,
      id: _id,
      // name: data.name,
      // category: data.category,
      // image: data.image,
      date: new Date(),
    };
    // console.log(item);
    var inquiry_data = await db.collection("inquiry").insertOne(item, (err) => {
      if (err) {
        // console.log(result2);
        console.log(err);
        res.send(err);
      }
    });
    // for refresh a page
    res.redirect("/productdetail/" + _id);
  } catch (error) {
    console.log(error);
  }
};

exports.getbanner = (req, res) => {
  db.collection("banner")
    .find({})
    .toArray((err, result) => {
      db.collection("poster")
        .find({})
        .toArray((err, result1) => {
          console.log("banner data available", result);

          var data = {
            data1: result1,
            data: result,
          };

          return route.responseData("adminPanel/banner.html", data, res);
        });
    });
};

exports.login = (req, res) => {
  sess = req.session;
  // sess.active = 'product';

  var email = req.body.email;
  var password = req.body.password;

  if (email && password) {
    db.collection("login").findOne(
      { email: email, password: password },
      function (err, result) {
        if (err) {
          console.log(err);
        } else if (result) {
          sess.email = req.body.email;
          // console.log(sess.email);


          res.redirect("/product/1");
        } else {
          return route.responseData(
            "adminPanel/index.html",
            {
              msg: "email and password not metch",
              msgs: "",
              error: true,
            },
            res
          );
        }
        res.end();
      }
    );
  } else {
    return route.responseData(
      "adminPanel/index.html",
      {
        msg: "",
        msgs: "Please Enter Email And Password",
        error: true,
      },
      res
    );
    res.end();
  }
};

exports.addposter = (req, res) => {
  var file = req.files.uploaded_image;
  var img_name = Date.now() + "_" + file.name;

  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/PNG"
  ) {
    file.mv("views/user/image/" + img_name, function (err) {
      var item = {
        image: img_name,
        date: new Date(),
      };

      if (err) return res.status(500).send(err);
      db.collection("poster")
        .find()
        .toArray((e, data) => {
          console.log(data.length);
          if (data.length > 0) {
            db.collection("poster").updateMany({}, { $set: item });
          } else {
            db.collection("poster").insert(item, function (err, result2) { });
          }
          res.redirect("/banner");
        });
    });
  }
};

exports.addbanner = (req, res) => {
  var file = req.files.uploaded_image;
  var img_name = Date.now() + "_" + file.name;

  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/PNG"
  ) {
    file.mv("views/user/image/" + img_name, function (err) {
      if (err) return res.status(500).send(err);

      var item = {
        image: img_name,
        date: new Date(),
      };
      db.collection("banner").insert(item, function (err, result2) {
        res.redirect("/banner");
      });
    });
  }
};

exports.getadmin = (req, res) => {
  return route.responseData(
    "adminPanel/index.html",
    {
      msg: "",
      msgs: "",
      error: true,
    },
    res
  );
};

exports.gettermsandconditions = (req, res) => {
  sess = "";
  aggregate = [
    {
      $lookup: {
        from: "subcategory",
        localField: "name",
        foreignField: "category",
        as: "item",
      },
    },
  ];

  db.collection("category")
    .aggregate(aggregate)
    .toArray((err, result) => {
      data = {
        data1: result,
      };
      return route.responseData("jewellery/termsandconditions.html", data, res);
    });
};

exports.privacypolicy = (req, res) => {
  sess = "";
  aggregate = [
    {
      $lookup: {
        from: "subcategory",
        localField: "name",
        foreignField: "category",
        as: "item",
      },
    },
  ];

  db.collection("category")
    .aggregate(aggregate)
    .toArray((err, result) => {
      data = {
        data1: result,
      };
      return route.responseData("jewellery/privacypolicy.html", data, res);
    });
};
exports.aboutmantradiamonds = (req, res) => {
  sess = "";
  aggregate = [
    {
      $lookup: {
        from: "subcategory",
        localField: "id",
        foreignField: "category",
        as: "item",
      },
    },
  ];

  db.collection("category")
    .aggregate(aggregate)
    .toArray((err, result) => {
      data = {
        data1: result,
      };
      return route.responseData(
        "jewellery/about-mantradiamond.html",
        data,
        res
      );
    });
};

exports.contactus = (req, res) => {
  sess = "";
  aggregate = [
    {
      $lookup: {
        from: "subcategory",
        localField: "id",
        foreignField: "category",
        as: "item",
      },
    },
  ];

  db.collection("category")
    .aggregate(aggregate)
    .toArray((err, result) => {
      data = {
        data1: result,
      };
      return route.responseData("jewellery/contact.html", data, res);
    });
};

exports.index = (req, res) => {
  sess = "";
  // sess.active = 'des';
  aggregate = [
    {
      $lookup: {
        from: "subcategory",
        localField: "id",
        foreignField: "category",
        as: "item",
      },
    },
  ];

  db.collection("category")
    .aggregate(aggregate)
    .toArray((err, result) => {
      db.collection("banner")
        .find({})
        .toArray((err, result2) => {
          db.collection("product")
            .find({ tselling: "checked" })
            .toArray((err, result3) => {
              db.collection("product")
                .find({ lcollection: "checked" })
                .toArray((err, result4) => {
                  db.collection("product")
                    .find({})
                    .sort({ _id: -1 })
                    .limit(10)
                    .toArray((err, result5) => {
                      db.collection("poster")
                        .find({})
                        .toArray((err, result6) => {
                          // console.log(result3)

                          var a = [];
                          for (var i = 0; i < result3.length; i++) {
                            var ts = {
                              _id: result3[i]._id,
                              name: result3[i].name,
                              price: parseInt(result3[i].price),
                              image: result3[i].image,
                            };
                            a.push(ts);
                          }

                          var b = [];
                          for (var i = 0; i < result4.length; i++) {
                            var lc = {
                              _id: result4[i]._id,
                              name: result4[i].name,
                              price: parseInt(result4[i].price),
                              image: result4[i].image,
                            };
                            b.push(lc);
                          }

                          var c = [];
                          for (var i = 0; i < result5.length; i++) {
                            var lp = {
                              _id: result5[i]._id,
                              name: result5[i].name,
                              price: parseInt(result5[i].price),
                              image: result5[i].image,
                            };
                            c.push(lp);
                          }

                          data = {
                            data1: result,
                            banner: result2,
                            tselling: a,
                            lcollection: b,
                            lproduct: c,
                            poster: result6,
                          };

                          // console.log(result)
                          return route.responseData(
                            "user/index.html",
                            data,
                            res
                          );
                          // res.send(data);
                        });
                    });
                });
            });
        });
    });
};

exports.logout = (req, res) => {
  req.session.destroy(function (err) {
    console.log(err);
    res.redirect("/admin");
  });
};


exports.myurl = (req, res) => {
  console.log("hello");
  var mydata = db.collection("banner").find().toArray()
  res.send(mydata)
  // console.log(mydata);
}