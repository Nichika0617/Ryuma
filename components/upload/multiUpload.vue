<template>
  <div>
    <el-upload
      action="http://qq7275guli.oss-ap-northeast-1.aliyuncs.com"
      :data="dataObj"
      :list-type="listType"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
      :show-file-list="showFile"
      accept=".jpg,.png"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
        alt
      />
    </el-dialog>
  </div>
</template>
<script>
import { policy } from "@/api/uploadApi";
import { getUUID } from "@/utils";
export default {
  name: "multiUpload",
  props: {
    //图片属性数组
    value: Array,
    //最大上传图片数量
    maxCount: {
      type: Number,
      default: 8,
    },
    listType: {
      type: String,
      default: "picture-card",
    },
    showFile: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      policyTimer: null,
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: "",
        uuid: "",
      },
      dialogVisible: false,
      dialogImageUrl: null,
    };
  },
  computed: {
    fileList() {
      let fileList = [];
      for (let i = 0; i < this.value.length; i++) {
        fileList.push({ url: this.value[i] });
      }
      return fileList;
    },
  },
  mounted() {
    this.fetchData();
    this.setTimer();
  },
  beforeDestroy() {
    console.log("beforedestroy");
    clearInterval(this.policyTimer);
  },
  methods: {
    setTimer(){
      this.policyTimer = setInterval(this.fetchData,60*1000);
    },
    emitInput(fileList) {
      let value = [];
      for (let i = 0; i < fileList.length; i++) {
        value.push(fileList[i].url);
      }
      this.$emit("input", value);
    },
    handleRemove(file, fileList) {
      this.emitInput(fileList);
    },
    handlePreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    beforeUpload(file) {
      let fileName = file.name;
      let uid = file.uid;
      let pos = fileName.lastIndexOf(".");
      let lastName = fileName.substring(pos, fileName.length);
      if (lastName.toLowerCase() !== ".png" && lastName.toLowerCase() !== ".jpg") {
        this.$message.error("Must be .png .jpg");
        return false;
      }
      // 限制上传文件的大小
      const isLt =
        file.size / 1024 / 5 >= 1 && file.size / 1024 / 1024 / 3 <= 1;
      if (!isLt) {
        this.$message.error("ファイルは5KB以上、3MB以内でお願いします。");
      }
      return isLt;
    },
    fetchData() {
      policy().then((response) => {
          this.dataObj.policy = response.data.policy;
          this.dataObj.signature = response.data.signature;
          this.dataObj.ossaccessKeyId = response.data.accessid;
          this.dataObj.key = response.data.dir + getUUID() + "_${filename}";
          this.dataObj.dir = response.data.dir;
          this.dataObj.host = response.data.host;
        });
    },
    handleUploadSuccess(res, file) {
      this.fileList.push({
        name: file.name,
        // url: this.dataObj.host + "/" + this.dataObj.dir + "/" + file.name； 替换${filename}为真正的文件名
        url:
          this.dataObj.host +
          "/" +
          this.dataObj.key.replace("${filename}", file.name),
      });
      this.emitInput(this.fileList);
    },
    handleExceed(files, fileList) {
      this.$message({
        message: "画像は最大" + this.maxCount + "枚アップロードできます。",
        type: "warning",
        duration: 1000,
      });
    },
  },
};
</script>

