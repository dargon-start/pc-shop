import Mock from "mockjs";
import banner from "./banner.json";
import floor from "./floor.json";

Mock.mock("http://mock/banner", {
  code: 200,
  data: banner,
});

Mock.mock("http://mock/floor", {
  code: 200,
  data: floor,
});
