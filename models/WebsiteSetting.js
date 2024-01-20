const mongoose = require("mongoose");

const websiteSetting = new mongoose.Schema(
  {
    websiteColorDark: { type: String, required: true },
    websiteColorLight: { type: String, required: true },
    websiteName: { type: String, required: true },
    websiteLogo:{ type: String, required: true },
    websiteFavicon: { type: String, required: true },
    editId : { type: String, default : 99 },
  },
  {
    strict: true,
  }
);

mongoose.models = {}; // to remove error

const model = mongoose.model("WebsiteSetting", websiteSetting);
export default model;
