const { logger } = require("../helper");





class Zoho {
  constructor() {
    this.url = "https://www.zohoapis.com/crm/v2/";
    this.clientId = "1000.4EGOYK4Y7CU0JPUQUTY1NYWHZJFB1K";
    this.clientSecret = "72d74b33fea28683889346a1a36313fd443348dbed";
    this.refreshToken =
      "1000.2a8aeaede76a61cf64adf601fe345d7d.aa40056f4602ec738aba9ee82a080cf7";
    this.accessToken =
      "1000.c7b2dbd38bd3d87b4155d357c61993e8.79cceda8f40e0b8d949e6e4d069c6703";
    this.redirectUri = "https://www.google.com";
    this.accessTokenUrl = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${this.refreshToken}&client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=${this.redirectUri}&grant_type=refresh_token`;
    this.init();
  }

  async setAccessToken() {
    try {
      console.log("inside setAccessToken function");
      const response = await fetch(this.accessTokenUrl, {
        method: "POST",
      });
      console.log("response", response);
      const data = await response.json();
      logger.info(`data of zoho, ${JSON.stringify(data)}`);
      this.accessToken = data.access_token;
      logger.info(`access_token, ${JSON.stringify(this.accessToken)}`);
    } catch (err) {
      logger.error(`error in setAccessToken, ${err}`);
    }
  }

  async init() {
    const oneHrs = 1000 * 60 * 60;
    return new Promise(async (resolve) => {
      await this.setAccessToken();
      setInterval(async () => {
        await this.setAccessToken();
      }, oneHrs);
      resolve();
    });
  }
}

module.exports = Zoho;
