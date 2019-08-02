import React, { Component } from "react";
import { Image, View, ScrollView, Modal, AsyncStorage } from "react-native";
import { Picker, Card, CardItem, Text, Toast, Body, Button, Icon, Content, Item, Input, Root, Container, Header, Left, Right } from "native-base";
import styles from "./styles";
import { Buffer } from "buffer";
import Permissions from "react-native-permissions";
import Sound from "react-native-sound";
import AudioRecord from "react-native-audio-record";

import * as BaseConfig from "./../config/BaseConfig";

const options = {
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
  wavFile: "audio1.wav"
};
const options2 = {
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
  wavFile: "audio2.wav"
};
const options3 = {
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
  wavFile: "audio3.wav"
};
var recordCount = 0;

class MainComponent extends Component {
  sound = null;
  sound2 = null;
  sound3 = null;
  //recordCount = 0;

  constructor(props) {
    super(props);

    this.getRandomScript = this.getRandomScript.bind(this);
    this.upload = this.upload.bind(this);
    this.onChangeGioiTinh = this.onChangeGioiTinh.bind(this);
    this.onChangeTuoi = this.onChangeTuoi.bind(this);
    this.onChangeVungMien = this.onChangeVungMien.bind(this);
    this.luuThongTinNguoiDung = this.luuThongTinNguoiDung.bind(this);

    this.state = {
      basic: true,
      scriptDes: "Nếu cơ hội không gõ cửa, hãy tạo ra một cánh cửa",
      scriptId: 0,
      audioFile: "",
      audioFile2: "",
      audioFile3: "",
      recording: false,
      recording2: false,
      recording3: false,
      dangGhi: false,
      loaded: false,
      loaded2: false,
      loaded3: false,
      paused: true,
      paused2: true,
      paused3: true,
      selectVungMien: 1,
      selectTuoi: 1,
      selectGioiTinh: 1,
      modalVisible: true,
      dsVungMien: [],
      dsTuoi: [],
      dsGioiTinh: [],
      email: "",
      showUpload: false,
      playIcon: "play-circle",
      play2Icon: "play-circle",
      play3Icon: "play-circle",
      vungMien: 0,
      tuoi: 0,
      gioiTinh: 0,
      soLan: 0,
      scriptStt: 0,
      Snr: 0
    };
  }

  componentWillUnmount() {}
  setName = value => {
    AsyncStorage.setItem("username", value);
  };
  setVungMien = value => {
    AsyncStorage.setItem("vungMien", value);
  };
  setGioiTinh = value => {
    AsyncStorage.setItem("gioiTinh", value);
  };
  setTuoi = value => {
    AsyncStorage.setItem("tuoi", value);
  };
  async componentDidMount() {
    await AsyncStorage.getItem("username").then(value => {
      if (value != null && value != "") {
        this.setModalVisible(false);
        this.setState({ email: value });
      }
    });

    await AsyncStorage.getItem("vungMien").then(value => {
      if (value != null && value != "") {
        this.setState({ selectVungMien: value });
      }
    });
    await AsyncStorage.getItem("gioiTinh").then(value => {
      if (value != null && value != "") {
        this.setState({ selectGioiTinh: value });
      }
    });
    await AsyncStorage.getItem("tuoi").then(value => {
      if (value != null && value != "") {
        this.setState({ selectTuoi: value });
      }
    });

    await this.checkPermission();

    AudioRecord.init(options);
    // AudioRecord2.init(options2);
    // AudioRecord3.init(options3);

    AudioRecord.on("data", data => {
      const chunk = Buffer.from(data, "base64");
      console.log("chunk size", chunk.byteLength);
      // do something with audio chunk
    });
    console.log("vao start 1", recordCount);
    this.setState({ audioFile: "", recording: true, loaded: false });
    AudioRecord.start();
    let audioFile = await AudioRecord.stop();
    console.log("audio file 1", audioFile);
    console.log("audioFileStop", audioFile);
    this.setState({ audioFile, recording: false });
    // AudioRecord2.on('data', data2 => {
    //   const chunk2 = Buffer.from(data2, 'base64');
    //   console.log('chunk size', chunk2.byteLength);
    //   // do something with audio chunk
    // });
    // AudioRecord3.on('data', data3 => {
    //   const chunk3 = Buffer.from(data3, 'base64');
    //   console.log('chunk size', chunk3.byteLength);
    //   // do something with audio chunk
    // });
    this.getRandomScript();

    fetch(BaseConfig.BASE_URL + "api/Home/GetAreaDropdown")
      .then(res => res.json())
      .then(json => {
        const dsVungMien = json;
        console.log(json);
        this.setState({ dsVungMien });
      });
    fetch(BaseConfig.BASE_URL + "api/Home/GetAgeDropdown")
      .then(res => res.json())
      .then(json => {
        const dsTuoi = json;
        this.setState({ dsTuoi });
      });
    fetch(BaseConfig.BASE_URL + "api/Home/GetSexDropdown")
      .then(res => res.json())
      .then(json => {
        const dsGioiTinh = json;
        this.setState({ dsGioiTinh });
      });
  }

  checkPermission = async () => {
    const p = await Permissions.check("microphone");
    console.log("permission check", p);
    if (p === "authorized") return;
    return this.requestPermission();
  };
  requestPermission = async () => {
    const p = await Permissions.request("microphone");
    console.log("permission request", p);
  };
  start = () => {
    //recordCount += 1;
    console.log("start", recordCount);
    // if (recordCount == 4) {
    //   Toast.show({
    //     text: "Mỗi nội dung chỉ ghi âm 3 lần. Hãy Upload hoặc làm mới nội dung.",
    //     type: "danger",
    //     position: "top",
    //     duration: 4000
    //   });
    //   return;
    // }
    console.log("start record");
    //if (recordCount == 1) {
    AudioRecord.init(options);

    AudioRecord.on("data", data => {
      const chunk = Buffer.from(data, "base64");
      console.log("chunk size", chunk.byteLength);
      // do something with audio chunk
    });

    console.log("vao start 1", recordCount);
    this.setState({ audioFile: "", recording: true, loaded: false, soLan: this.state.soLan + 1 });
    AudioRecord.start();
    //}
    // if (recordCount == 2) {
    //   AudioRecord.init(options2);

    // AudioRecord.on('data', data => {
    //   const chunk = Buffer.from(data, 'base64');
    //   console.log('chunk size', chunk.byteLength);
    //   // do something with audio chunk
    // });
    //   console.log('vao start 2', recordCount);
    //   this.setState({ audioFile2: '', recording2: true, recording: true, loaded2: false });
    //   AudioRecord.start();
    // }
    // if (recordCount == 3) {
    //   AudioRecord.init(options3);

    // AudioRecord.on('data', data => {
    //   const chunk = Buffer.from(data, 'base64');
    //   console.log('chunk size', chunk.byteLength);
    //   // do something with audio chunk
    // });
    //   console.log('vao start 3', recordCount);
    //   this.setState({ audioFile3: '', recording3: true, recording: true, loaded3: false });
    //   AudioRecord.start();
    // }
  };

  stop = async () => {
    console.log("stop", recordCount);
    //if (recordCount == 1) {
    console.log("vao stop 1", recordCount);
    if (!this.state.recording) return;
    console.log("stop record");
    let audioFile = await AudioRecord.stop();
    console.log("audio file 1", audioFile);
    console.log("audioFileStop", audioFile);
    this.setState({ audioFile, recording: false, showUpload: true });
    //}
    // if (recordCount == 2) {
    //   console.log('vao stop2', recordCount);
    //   if (!this.state.recording2) return;
    //   console.log('stop record');
    //   let audioFile2 = await AudioRecord.stop();
    //   console.log('audioFileStop', audioFile2);
    //   this.setState({ audioFile2, recording: false, recording2: false });
    // }
    // if (recordCount == 3) {
    //   console.log('vao stop3', recordCount);
    //   if (!this.state.recording3) return;
    //   console.log('stop record');
    //   let audioFile3 = await AudioRecord.stop();
    //   console.log('audioFileStop', audioFile3);
    //   this.setState({ audioFile3, recording: false, recording3: false, showUpload: true });
    // }
  };

  load = () => {
    console.log("load 1");
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject("file path is empty");
      }

      this.sound = new Sound(this.state.audioFile, "", error => {
        if (error) {
          console.log("failed to load the file", error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };
  load2 = () => {
    console.log("load 2");
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile2) {
        return reject("file path is empty");
      }

      this.sound2 = new Sound(this.state.audioFile2, "", error => {
        if (error) {
          console.log("failed to load he file", error);
          return reject(error);
        }
        this.setState({ loaded2: true });
        return resolve();
      });
    });
  };
  load3 = () => {
    console.log("load 3");
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile3) {
        return reject("file path is empty");
      }

      this.sound3 = new Sound(this.state.audioFile3, "", error => {
        if (error) {
          console.log("failed to load the file", error);
          return reject(error);
        }
        this.setState({ loaded3: true });
        return resolve();
      });
    });
  };
  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    //this.upload();

    this.setState({ paused: false, playIcon: "pause-circle-o" });
    Sound.setCategory("Playback");

    this.sound.play(success => {
      if (success) {
        console.log("successfully finished playing 1");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
      this.setState({ paused: true, playIcon: "play-circle" });
      // this.sound.release();
    });
  };
  play2 = async () => {
    if (!this.state.loaded2) {
      try {
        await this.load2();
      } catch (error) {
        console.log(error);
      }
    }

    //this.upload();

    this.setState({ paused2: false, play2Icon: "pause-circle-o" });
    Sound.setCategory("Playback");

    this.sound2.play(success => {
      if (success) {
        console.log("successfully finished playing 2");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
      this.setState({ paused2: true, play2Icon: "play-circle" });
      // this.sound.release();
    });
  };
  play3 = async () => {
    if (!this.state.loaded3) {
      try {
        await this.load3();
      } catch (error) {
        console.log(error);
      }
    }

    //this.upload();

    this.setState({ paused3: false, play3Icon: "pause-circle-o" });
    Sound.setCategory("Playback");

    this.sound3.play(success => {
      if (success) {
        console.log("successfully finished playing 3");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
      this.setState({ paused3: true, play3Icon: "play-circle" });
      // this.sound.release();
    });
  };

  pause = () => {
    //if (recordCount == 1) {
    this.sound.pause();
    this.setState({ paused: true });
    // }
    // if (recordCount == 2) {
    //   this.sound2.pause();
    //   this.setState({ paused2: true });
    // }
    // if (recordCount == 3) {
    //   this.sound3.pause();
    //   this.setState({ paused3: true });
    // }
  };

  async upload() {
    const formData_SNR = new FormData();
    formData_SNR.append("file", {
      uri: "file://" + this.state.audioFile,
      name: "audio.wav",
      type: "audio/wav"
    });

    //upload to check snr
    try {
      fetch("http://10.46.31.130:8080/upload/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: formData_SNR
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("gggggg");
          console.log(responseJson);
          console.log(responseJson.result);

          if (responseJson.result < 20) {
            Toast.show({
              text: "SNR: " + responseJson.result + ".Chất lượng ghi âm không tốt. Vui lòng ghi âm lại.",
              type: "danger",
              position: "top",
              duration: 4000
            });
          } else {
            //upload for stored
            const formData_Upl = new FormData();
            formData_Upl.append("audio_data1", {
              uri: "file://" + this.state.audioFile,
              name: "audio.wav",
              type: "audio/wav"
            });
            var model = {};
            model.ScriptId = this.state.scriptId;
            model.ScriptDes = this.state.scriptDes;
            model.Email = this.state.email;
            model.AreaId = this.state.selectVungMien;
            model.AgeId = this.state.selectTuoi;
            model.SexId = this.state.selectGioiTinh;
            model.Snr = responseJson.result;
            console.log(model);
            formData_Upl.append("model", JSON.stringify(model));

            fetch(BaseConfig.BASE_URL + "api/Home/UploadAudio2", {
              method: "POST",
              headers: {
                "Content-Type": "multipart/form-data"
              },
              body: formData_Upl
            })
              .then(response => response.json())
              .then(responseJson => {
                if (responseJson != "ok") {
                  Toast.show({
                    text: responseJson,
                    type: "danger",
                    position: "top",
                    duration: 4000
                  });
                } else {
                  Toast.show({
                    text: "Cập nhật thành công",
                    type: "success",
                    position: "top",
                    duration: 4000
                  });
                }
              });
          }
        })
        .catch(error => console.log(error));
    } catch (err) {
      Toast.show({
        text: "Cập nhật thất bại",
        buttonText: "",
        type: "danger"
      });
    }
  }

  luuThongTinNguoiDung() {
    var model = {};
    model.Email = this.state.email;
    model.AreaId = this.state.selectVungMien;
    model.AgeId = this.state.selectTuoi;
    model.SexId = this.state.selectGioiTinh;

    fetch(BaseConfig.BASE_URL + "api/Home/KiemTraThongTinNguoiDung", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(model)
    })
      .then(response => response.json())
      .then(rs => {
        if (rs == "ok") {
          this.setState({ modalVisible: false });
          this.setModalVisible(false);
          this.setName(model.Email);
          this.setVungMien(model.AreaId);
          this.setGioiTinh(model.SexId);
          this.setTuoi(model.AgeId);
          this.getRandomScript();
          this.setState({ vungMien: model.AreaId, tuoi: model.AgeId, gioiTinh: model.SexId });
        } else {
          Toast.show({
            text: rs,
            type: "danger",
            position: "top",
            duration: 4000
          });
        }
      });
  }

  getRandomScript() {
    recordCount = 0;
    this.setState({
      showUpload: false,
      recording: false,
      audioFile: "",
      audioFile2: "",
      audioFile3: ""
    });
    var model = {};
    model.email = this.state.email;
    fetch(BaseConfig.BASE_URL + "api/Home/GetRandomScript", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(model)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          scriptDes: responseJson.SCRIPT_DESCRITPTION,
          scriptId: responseJson.SCRIPT_ID,
          scriptStt: responseJson.STT
        });
      })
      .catch(error => {
        console.log("xx");
      });
  }

  onChangeVungMien(value) {
    this.setState({
      selectVungMien: value
    });
  }
  onChangeTuoi(value) {
    this.setState({
      selectTuoi: value
    });
  }
  onChangeGioiTinh(value) {
    this.setState({
      selectGioiTinh: value
    });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    const { recording, paused, audioFile, audioFile2, audioFile3, paused2, paused3, recording2, recording3 } = this.state;
    let vungMienItems = this.state.dsVungMien.map(data => {
      return <Picker.Item value={data.Id} label={data.Name} />;
    });
    let tuoiItems = this.state.dsTuoi.map(data => {
      return <Picker.Item value={data.Id} label={data.Name} />;
    });
    let gioiTinhItems = this.state.dsGioiTinh.map(data => {
      return <Picker.Item value={data.Id} label={data.Name} />;
    });
    return (
      <Container>
        <Header>
          <Left style={{ flexDirection: "row" }}>
            <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: "white", marginRight: 15 }} />
          </Left>
          <Right />
        </Header>
        <View style={{ height: "100%" }}>
          <Root>
            <Card style={{ flex: 1 }}>
              <CardItem
                bordered
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                  paddingBottom: 5,
                  borderBottomWidth: 0
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 14, alignSelf: "center" }}>
                  - Thu trong môi trường càng yên tĩnh càng tốt, tránh xa các nguồn nhiễu âm thanh (vd: điều hoà, quạt,...). - Đọc tự nhiên, đọc sai
                  kịch bản dù chỉ 1 từ cũng phải thu âm lại cả câu.
                </Text>
              </CardItem>
              <CardItem
                bordered
                style={{
                  alignSelf: "center",
                  marginTop: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                  paddingBottom: 5,
                  borderBottomWidth: 0
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 14, alignSelf: "center" }}>(Nhấn Bắt đầu để ghi âm đoạn văn bản dưới đây)</Text>
              </CardItem>
              <CardItem
                bordered
                style={{ alignSelf: "center", paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 10, borderBottomWidth: 0 }}
              >
                <Text style={{ textAlign: "center", fontSize: 16, marginTop: 20, color: "#d35400", fontStyle: "bold" }}>
                  {"Câu " + (this.state.scriptStt + 1) + ": " + this.state.scriptDes}
                </Text>
              </CardItem>
              <CardItem bordered style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                <View style={{ flex: 3, flexDirection: "row", marginTop: 20 }}>
                  <Button
                    iconLeft
                    success
                    onPress={this.start}
                    disabled={recording}
                    style={{ justifyContent: "center", alignSelf: "center", flex: 1 }}
                  >
                    <Icon type="FontAwesome" name="play-circle-o" />
                    <Text style={{ paddingLeft: 3 }}>Bắt đầu</Text>
                  </Button>

                  <Button
                    iconLeft
                    danger
                    onPress={this.stop}
                    disabled={!recording}
                    style={{ justifyContent: "center", alignSelf: "center", flex: 1, marginLeft: 5 }}
                  >
                    <Icon type="FontAwesome" name="stop-circle-o" />
                    <Text style={{ paddingLeft: 3 }}>Dừng lại</Text>
                  </Button>

                  <Button
                    iconLeft
                    light
                    onPress={() => this.getRandomScript()}
                    style={{ justifyContent: "center", alignSelf: "center", flex: 1, marginLeft: 5 }}
                  >
                    <Icon type="FontAwesome" name="refresh" style={{ fontSize: 16 }} />
                    <Text style={{ paddingLeft: 3 }}>Làm mới</Text>
                  </Button>
                </View>
              </CardItem>
              {this.state.showUpload == true ? (
                <CardItem bordered style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                  <View style={{ flex: 2, flexDirection: "row", marginTop: 20 }}>
                    <Button
                      iconLeft
                      warning
                      onPress={this.play}
                      disabled={!audioFile}
                      style={{ justifyContent: "center", alignSelf: "center", flex: 1, marginLeft: 5 }}
                    >
                      <Icon type="FontAwesome" name={this.state.playIcon} />
                      <Text style={{ paddingLeft: 3 }}>Nghe lại</Text>
                    </Button>

                    <Button
                      iconLeft
                      info
                      onPress={() => this.upload()}
                      disabled={!audioFile}
                      style={{ justifyContent: "center", alignSelf: "center", flex: 1, marginLeft: 5 }}
                    >
                      <Icon type="FontAwesome" name="cloud-upload" />
                      <Text>Upload</Text>
                    </Button>
                  </View>

                  {/* <Button iconLeft warning onPress={this.play2} disabled={!audioFile2} style={{ justifyContent: "center", alignSelf: 'center', flex: 1, marginLeft: 5 }}>
                  <Icon type="FontAwesome" name={this.state.play2Icon} />
                  <Text style={{paddingLeft:3}}>Nghe lại 2</Text>
                </Button>
                <Button iconLeft warning onPress={this.play3} disabled={!audioFile3} style={{ justifyContent: "center", alignSelf: 'center', flex: 1, marginLeft: 5 }}>
                  <Icon type="FontAwesome" name={this.state.play3Icon} />
                  <Text style={{paddingLeft:3}}>Nghe lại 3</Text>
                </Button> */}
                </CardItem>
              ) : (
                <View />
              )}
              {/* <CardItem bordered style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
              <View style={{ flex: 1, flexDirection: "row", marginTop: 20, justifyContent: "center" }}>
                <View style={{ flex: 0.5, padding: 5 }}>
                  <Button iconLeft warning onPress={this.play} disabled={!audioFile} style={{ justifyContent: "center", alignSelf: 'center' }}>
                    <Icon type="FontAwesome" name="play-circle" />
                    <Text>Nghe lại</Text>
                  </Button>
                </View>
                <View style={{ flex: 0.5, padding: 5 }}>
                  <Button iconLeft info onPress={() => this.setModalVisible(true)} disabled={!audioFile} style={{ justifyContent: "center", alignSelf: 'center' }}>
                    <Icon type="FontAwesome" name="cloud-upload" />
                    <Text>Upload</Text>
                  </Button>
                </View>
              </View>
            </CardItem> */}
            </Card>
          </Root>

          <View>
            <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => {}}>
              <Root>
                <Content padder>
                  <Card>
                    <CardItem header bordered style={{ padding: 2, margin: 0 }}>
                      <Text style={{ flex: 0.8 }}>Thông tin của bạn</Text>
                    </CardItem>
                    <ScrollView style={{ height: 400 }}>
                      <CardItem>
                        <Body>
                          <View style={{ width: "100%" }}>
                            <Text>Email</Text>
                            <Item regular>
                              <Input placeholder="" onChangeText={email => this.setState({ email })} />
                            </Item>
                          </View>
                        </Body>
                      </CardItem>
                      <CardItem>
                        <View style={{ width: "100%" }}>
                          <Text>Vùng miền</Text>
                          <View style={{ borderWidth: 0.5, borderColor: "#d2dae2" }}>
                            <Picker
                              mode="dropdown"
                              textStyle={{ fontSize: 12 }}
                              itemTextStyle={{ color: "#007aff" }}
                              itemStyle={{ fontSize: 12 }}
                              iosIcon={<Icon name="ios-arrow-down-outline" />}
                              style={{ fontSize: 12 }}
                              selectedValue={this.state.selectVungMien}
                              onValueChange={selectVungMien => this.onChangeVungMien(selectVungMien)}
                            >
                              {vungMienItems}
                            </Picker>
                          </View>
                        </View>
                      </CardItem>
                      <CardItem>
                        <View style={{ width: "100%" }}>
                          <Text>Tuổi</Text>
                          <View style={{ borderWidth: 0.5, borderColor: "#d2dae2" }}>
                            <Picker
                              mode="dropdown"
                              textStyle={{ fontSize: 12 }}
                              itemTextStyle={{ color: "#007aff" }}
                              itemStyle={{ fontSize: 12 }}
                              iosIcon={<Icon name="ios-arrow-down-outline" />}
                              style={{ fontSize: 12 }}
                              selectedValue={this.state.selectTuoi}
                              onValueChange={selectTuoi => this.onChangeTuoi(selectTuoi)}
                            >
                              {tuoiItems}
                            </Picker>
                          </View>
                        </View>
                      </CardItem>
                      <CardItem>
                        <View style={{ width: "100%" }}>
                          <Text>Giới tính</Text>
                          <View style={{ borderWidth: 0.5, borderColor: "#d2dae2" }}>
                            <Picker
                              mode="dropdown"
                              textStyle={{ fontSize: 12 }}
                              itemTextStyle={{ color: "#007aff" }}
                              itemStyle={{ fontSize: 12 }}
                              iosIcon={<Icon name="ios-arrow-down-outline" />}
                              style={{ fontSize: 12 }}
                              selectedValue={this.state.selectGioiTinh}
                              onValueChange={selectGioiTinh => this.onChangeGioiTinh(selectGioiTinh)}
                            >
                              {gioiTinhItems}
                            </Picker>
                          </View>
                        </View>
                      </CardItem>
                    </ScrollView>

                    <View>
                      <Button
                        full
                        info
                        style={[{ marginTop: 5 }]}
                        onPress={() => {
                          this.luuThongTinNguoiDung();
                        }}
                      >
                        <Text>Lưu</Text>
                      </Button>
                    </View>
                  </Card>
                </Content>
              </Root>
            </Modal>
          </View>
          {/* end modal */}
        </View>
      </Container>
    );
  }
}

export default MainComponent;
