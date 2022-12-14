import axios from "axios";
import apiPath from "../common/apiPath";

const myGalleryInfoUpdate = async (datas: any) => {
  console.log("헤이", datas);
  let entries = datas.entries();
  for (const pair of entries) {
    console.log(pair[0] + ", " + pair[1]);
  }
  try {
    const {
      data: { result, data },
    }: any = await axios({
      method: "PUT",
      url: apiPath.gallery.myGalleryInfo(),
      data: datas,
    });
    console.log("업데이트결과", data);
    if (result === "success") {
      console.log(data);
      return data;
    } else {
      alert("통신에러");
    }
  } catch (error) {
    console.error(error);
  }
};

export default myGalleryInfoUpdate;
