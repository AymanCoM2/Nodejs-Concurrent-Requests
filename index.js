const axios = require("axios");

let link1 = "http://192.2.1.18:8000/InvoiceOrders/Comments/20230141";
let link2 = "http://192.2.1.18:8000/InvoiceOrders/";
let link3 = "http://192.2.1.18:8000/Customers/";
let link4Post = "http://192.2.1.18:8000/InvoiceOrders/Comments/addComment";
let link4Data = {
  approval_comment_id: 0,
  invoiceCode: "20230219",
  userCode: "AS900",
  userName: "mostafa1",
  Comment: "test",
};
let link5 = "http://192.2.1.18:8000/InvoiceOrders/20230141";
let link6 = "http://192.2.1.18:8000/InvoiceOrders/20230144";

async function tryLinkRequestGET(link) {
  try {
    const response = await axios.get(link);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`GET Request failed with status ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

async function tryLinkRequestPOST(link, data) {
  try {
    const response = await axios.post(link, data);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

async function tryAllRequests() {
  try {
    const requestPromises = [
      tryLinkRequestGET(link1),
      tryLinkRequestGET(link2),
      tryLinkRequestGET(link3),
      tryLinkRequestPOST(link4Post, link4Data),
      tryLinkRequestPOST(link5, {}),
      tryLinkRequestPOST(link6, {}),
    ];
    const results = await Promise.all(requestPromises);
    const [result1, result2, result3, result4, result5, result6] = results;
    console.log("Result of GET Request 1:", result1);
    console.log("Result of GET Request 2:", result2);
    console.log("Result of GET Request 3:", result3);
    console.log("Result of POST Request 4:", result4);
    console.log("Result of POST Request 5:", result5);
    console.log("Result of POST Request 6:", result6);
  } catch (error) {
    console.error("Error:", error);
  }
}

tryAllRequests();

setInterval(async function TwentyConnection() {
  try {
    const requestPromises = [
      tryLinkRequestGET(link1),
      tryLinkRequestGET(link2),
      tryLinkRequestGET(link3),
      tryLinkRequestGET(link1),
      tryLinkRequestGET(link2),
      tryLinkRequestGET(link3),
      tryLinkRequestGET(link1),
      tryLinkRequestGET(link2),
      tryLinkRequestGET(link3),
      tryLinkRequestGET(link1),
      tryLinkRequestGET(link2),
      tryLinkRequestGET(link3),
      tryLinkRequestGET(link1),
      tryLinkRequestGET(link2),
      tryLinkRequestGET(link3),
      tryLinkRequestGET(link1),
      tryLinkRequestGET(link2),
      tryLinkRequestGET(link3),
      // 18 Requests Are the Above === 3 * 6
      tryLinkRequestPOST(link5, {}),
      tryLinkRequestPOST(link6, {}),
      // Now all 20 Requests
    ];
    const results = await Promise.all(requestPromises);
    console.log("New Cycle");
  } catch (error) {
    console.error("Error:", error);
  }
}, 1000);
