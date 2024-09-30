const { logger } = require("../helper");

class ZohoCrm {
  constructor(accessToken) {
    this.baseUrl = "https://www.zohoapis.in/crm/v2/";
    this.accessToken = accessToken;
  }

  async insertRecords(record) {
    try {
      let url = `${this.baseUrl}Leads`;

      let headers = {
        Authorization: "Zoho-oauthtoken " + this.accessToken,
      };

      let requestBody = {};
      let recordArray = [];

      recordArray.push(record);

      requestBody["data"] = recordArray;

      let trigger = ["approval", "workflow", "blueprint"];
      requestBody["trigger"] = trigger;

      let requestDetails = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
        encoding: "utf8",
        throwHttpErrors: false,
      };

      let response = await fetch(url, requestDetails);

      console.log("record", record);
      console.log("server sir response", response.status);

      // if status contains 20 then it is success
      if (response.status.toString().includes("20")) return 200;
      else return response.status;

      if (response != null) {
        logger.info(`${JSON.stringify(response)}`);
        // console.log(response.statusCode);
        // console.log(response.body);
      }
    } catch (err) {
      console.log("zoho insert error", err);
    }
  }
}

module.exports = ZohoCrm;
