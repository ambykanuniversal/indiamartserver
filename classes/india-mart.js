class IndiaMart {
  constructor() {
    this.oathToken = "mR20Ebpu7HzDT/eo43WM7l6Po1LMnQ==";
    this.baseUrl = `https://mapi.indiamart.com/wservce/crm/crmListing/v2/?glusr_crm_key=${this.oathToken}`;
  }

  async getLeads({ start_date, end_date }) {
    const url = `${this.baseUrl}&start_time=${start_date}&end_time=${end_date}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("url", url);
    console.log("data_from_India_Mart", data);
    console.log("response_from_India_Mart", data.RESPONSE);
    return data.RESPONSE;
  }
}

module.exports = IndiaMart;
