const { db } = require("../database");

module.exports = {
  salesReport: (req, res) => {
    let selectQuery = `SELECT u.id_user, u.username, t.id_transaction, p.product_name, p.product_price, p.unit, t.qty, t.tax, t.total_price, 
    t.date, t.payment_method, t.expedition_name, t.shipping_cost, t.image, t.status, c.id_cart, co.id_custom_order, pre.id_prescription
    FROM report r
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Sales Report Data Succeed" })
      // res.status(200).send(results)
    })
  },
  countTotalPrice: (req, res) => {
    let selectQuery = `select sum(total_price) as total_price
    FROM report r
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Total Price Succeed" })
    })
  },
  countShipping: (req, res) => {
    let selectQuery = `select sum(shipping_cost) as total_shipping
    FROM report r
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Shipping Cost Succeed" })
    })
  },
  countTotalPriceMonthly: (req, res) => {
    let selectQuery = `SELECT sum(total_price) as total_price FROM pharma2.transaction WHERE MONTH(date) = 10 AND status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Monthly Total Price Succeed" })
    })
  },
  countShippingMonthly: (req, res) => {
    let selectQuery = `SELECT sum(shipping_cost) as shipping_cost FROM pharma2.transaction WHERE MONTH(date) = 10 AND status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Monthly Shipping Cost Succeed" })
    })
  },
  countTax: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax FROM pharma2.transaction;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Tax Succeed" })
    })
  },
  countTaxMonthly: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax FROM pharma2.transaction WHERE MONTH(date) = 10 AND status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Monthly Tax Succeed" })
    })
  },
  countStockPrice: (req, res) => {
    let selectQuery = `SELECT sum(stock_price) as stock_price FROM
    (SELECT admin_price, stock, (admin_price * stock) AS 'stock_price' FROM product) AS stock_price;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Stock Price Succeed" })
    })
  },
  countRestockPrice: () => {
    let selectQuery = `SELECT sum(restock_price) AS restock_price FROM
    (SELECT restock_qty, admin_price, (restock_qty * admin_price) AS 'restock_price' FROM restock res
    LEFT JOIN product p ON p.id_product = res.id_product) AS restock_price;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Restock Price Succeed" })
      // res.status(200).json(results)
    })
  },
  countRestockPriceMonthly: () => {
    let selectQuery = `SELECT sum(restock_price) AS restock_price FROM
    (SELECT restock_qty, admin_price, (restock_qty * admin_price) AS 'restock_price', restock_date FROM restock res
    LEFT JOIN product p ON p.id_product = res.id_product
    WHERE MONTH(restock_date) = 10) AS restock_price;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Monthly Restock Price Succeed" })
    })
  },
  topSellMg: () => {
    let selectQuery = `SELECT max(qty), p.product_name
    FROM report r
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done' AND p.unit = 'mg';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Top Seller mg Unit Succeed" })
    })
  },
  topSellMgMonthly: () => {
    let selectQuery = `SELECT max(qty), p.product_name
    FROM report r
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done' AND p.unit = 'mg' AND MONTH(date) = 10;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Monthly Top Seller mg Unit Succeed" })
    })
  },
  topSellMl: () => {
    let selectQuery = `SELECT max(qty), p.product_name
    FROM report r
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done' AND p.unit = 'ml';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Top Seller ml Unit Succeed" })
    })
  },
  topSellMlMonthly: () => {
    let selectQuery = `SELECT max(qty), p.product_name
    FROM report r
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done' AND p.unit = 'ml' AND MONTH(date) = 10;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Monthly Top Seller ml Unit Succeed" })
    })
  },
  topSellBt: () => {
    let selectQuery = `SELECT max(qty), p.product_name
    FROM report r
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done' AND p.unit = 'bottle';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Top Seller bottle Unit Succeed" })
    })
  },
  topSellBtMonthly: () => {
    let selectQuery = `SELECT max(qty), p.product_name
    FROM report r
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done' AND p.unit = 'bottle' AND MONTH(date) = 10;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Monthly Top Seller bottle Unit Succeed" })
    })
  }
}
