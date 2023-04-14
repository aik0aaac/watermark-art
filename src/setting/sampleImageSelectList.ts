// サンプル画像インポート
import sample from "@/assets/images/sample.png";
import sample2 from "@/assets/images/sample2.png";

interface ISelectList {
  label: string;
  value: any;
}
export const sampleImageSelectList: ISelectList[] = [
  {
    label: "サンプル",
    value: sample,
  },
  {
    label: "サンプル2",
    value: sample2,
  },
];
