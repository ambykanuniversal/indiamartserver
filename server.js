// const ZohoCrm = require("./classes/zoho-crm");
// const { logger } = require("./helper");

// const main = async (leads, accessToken) => {
//   let statusCode = 500;
//   try {
//     const zohoCrm = new ZohoCrm(accessToken);

//     for (let i = 0; i < leads.length; i++) {
//       const lead = leads[i];
//       console.log("lead", lead);
//       let record = {
//         Company: lead.SENDER_COMPANY,
//         Last_Name:
//           lead.SENDER_NAME.split(" ")[1] || lead.SENDER_NAME.split(" ")[0],
//         First_Name: lead.SENDER_NAME.split(" ")[0],
//         Email: lead.SENDER_EMAIL,
//         State: lead.SENDER_STATE,
//         Phone: lead.SENDER_MOBILE,
//         City: lead.SENDER_CITY,
//         Description: `${lead.SUBJECT} <br> ${lead.QUERY_MESSAGE}`,
//         Notes: lead.SUBJECT,
//         Street: lead.SENDER_ADDRESS,
//         IndiaMart_Lead_Time: lead.QUERY_TIME,
//       };
//       statusCode = await zohoCrm.insertRecords(record);
//       console.log("statusCode", statusCode);
//     }
//   } catch (e) {
//     logger.error(`Error, ${e}`);
//   }

//   logger.info("***End of the script***");
//   return statusCode;
// };

// module.exports = main;

const ZohoCrm = require("./classes/zoho-crm");
const { logger } = require("./helper");

const main = async (leads, accessToken) => {
  let statusCode = 500;
  try {
    const zohoCrm = new ZohoCrm(accessToken);

    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      console.log("lead", lead);

      // Check if QUERY_MESSAGE is a string and parse it to JSON
      let queryMessage;
      try {
        queryMessage =
          typeof lead.QUERY_MESSAGE === "string"
            ? JSON.parse(lead.QUERY_MESSAGE)
            : lead.QUERY_MESSAGE;
      } catch (e) {
        logger.error(`Error parsing QUERY_MESSAGE for lead ${i}: ${e}`);
        queryMessage = {};
      }

      // Extract and format the information from isq
      let isqInfo = "";
      if (queryMessage.isq) {
        isqInfo = Object.entries(queryMessage.isq)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
      }

      let record = {
        Company: lead.SENDER_COMPANY,
        Last_Name:
          lead.SENDER_NAME.split(" ")[1] || lead.SENDER_NAME.split(" ")[0],
        First_Name: lead.SENDER_NAME.split(" ")[0],
        Email: lead.SENDER_EMAIL,
        State: lead.SENDER_STATE,
        Phone: lead.SENDER_MOBILE,
        City: lead.SENDER_CITY,
        Description: `${lead.SUBJECT} | ${
          queryMessage.message_text || ""
        } | ${isqInfo}`,
        Notes: lead.SUBJECT,
        Street: lead.SENDER_ADDRESS,
        IndiaMart_Lead_Time: lead.QUERY_TIME,
      };

      statusCode = await zohoCrm.insertRecords(record);
      console.log("statusCode", statusCode);
    }
  } catch (e) {
    logger.error(`Error, ${e}`);
  }

  logger.info("***End of the script***");
  return statusCode;
};

module.exports = main;
