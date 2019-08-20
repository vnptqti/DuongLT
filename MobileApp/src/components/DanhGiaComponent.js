import React, { Component } from "react";
import { Image, View, ScrollView, Modal, AsyncStorage } from "react-native";
import { Picker, Card, CardItem, Text, Toast, Body, Button, Icon, Content, Item, Input, Root, Container, Header, Left, Right } from "native-base";
import styles from "./styles";
import { Buffer } from "buffer";
import Permissions from "react-native-permissions";
import Sound from "react-native-sound";
import AudioRecord from "react-native-audio-record";

import * as BaseConfig from "../config/BaseConfig";

class DanhGiaComponent extends Component {
  constructor(props) {
    super(props);

    var hello;

    this.updateVote = this.updateVote.bind(this);
    this.getRandomScript = this.getRandomScript.bind(this);

    this.state = {
      basic: true,
      scriptDes: "Nếu cơ hội không gõ cửa, hãy tạo ra một cánh cửa",
      scriptId: 0,
      scriptStt: 0,
      snr: 0,
      rowId: 0,
      fileLocaltion: '',
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    this.getRandomScript();

    
  }

  handlePress() {
    this.hello.play((success) => {
      if (!success) {
        console.log('Sound did not play')
      }
    })
  }


  getRandomScript() {
    var model = {};
    model.email = "";
    fetch(BaseConfig.BASE_URL + "api/Home/GetRandomScriptDanhGia", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(model)
    })
      .then(response => response.json())
      .then(responseJson => {
        
        this.setState({
          scriptDes: responseJson.SCRIPT_DESCRITPTION,
          scriptId: responseJson.SCRIPT_ID,
          snr: responseJson.SNR,
          rowId: responseJson.FILE_ID
        });

        console.log(responseJson.AudioContent);
        let audioContent = BaseConfig.BASE_URL + 'Admin/PlayFile?fileName=' + responseJson.FILE_NAME;
        this.hello = new Sound(audioContent, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        });

      })
      .catch(error => {
        console.log("xx");
      });
  }

  updateVote(type) {
    var model = {};
    model.Type = type;
    model.RowId = this.state.rowId;

    console.log(model);

    fetch(BaseConfig.BASE_URL + "api/Home/UpdateVote", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(model)
    })
      .then(response => response.json())
      .then(rs => {
        console.log(rs);
        if (rs == "ok") {
          Toast.show({
            text: "Gửi đánh giá thành công!",
            type: "success",
            position: "top",
            duration: 4000
          });
          this.getRandomScript();
        } else {
          Toast.show({
            text: "Gửi đánh giá thất bại!",
            type: "danger",
            position: "top",
            duration: 4000
          });
        }
      });
  }

  render() {
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
                style={{ alignSelf: "center", paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 10, borderBottomWidth: 0 }}
              >
                <Text style={{ textAlign: "center", fontSize: 16, marginTop: 20, color: "#d35400", fontStyle: "bold" }}>{this.state.scriptDes}</Text>
              </CardItem>
              <CardItem
                bordered
                style={{ alignSelf: "center", paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 10, borderBottomWidth: 0 }}
              >
                <Text style={{ textAlign: "center", fontSize: 16, marginTop: 20, color: "#d35400", fontStyle: "bold" }}>
                  {"SNR :" + (this.state.snr == undefined ? "Không rõ" : this.state.snr)}
                </Text>
              </CardItem>
              <CardItem bordered style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                <View style={{ flex: 2, flexDirection: "row", marginTop: 20 }}>
                  <Button
                    iconLeft
                    success
                    onPress={() => this.updateVote("like")}
                    style={{ justifyContent: "center", alignSelf: "center", flex: 1, marginLeft: 5 }}
                  >
                    <Icon type="FontAwesome" name="thumbs-up" />
                    <Text style={{ paddingLeft: 3 }}> Tốt</Text>
                  </Button>
                  <Button
                    iconLeft
                    warning
                    onPress={() => this.updateVote("disLike")}
                    style={{ justifyContent: "center", alignSelf: "center", flex: 1, marginLeft: 5 }}
                  >
                    <Icon type="FontAwesome" name="thumbs-down" />
                    <Text> Không tốt</Text>
                  </Button>
                </View>
              </CardItem>
              <CardItem bordered style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                <View style={{ flex: 2, flexDirection: "row", marginTop: 20 }}>
                  <Button
                    iconLeft
                    info
                    onPress={this.handlePress.bind(this)}
                    style={{ justifyContent: "center", alignSelf: "center", flex: 1, marginLeft: 5 }}
                  >
                    <Icon type="FontAwesome" name="play-circle" />
                    <Text>Nghe</Text>
                  </Button>
                  <Button
                    iconLeft
                    light
                    onPress={() => this.getRandomScript()}
                    style={{ justifyContent: "center", alignSelf: "center", flex: 1, marginLeft: 5 }}
                  >
                    <Icon type="FontAwesome" name="refresh" />
                    <Text>Tiếp theo</Text>
                  </Button>
                </View>
              </CardItem>
            </Card>
          </Root>
        </View>
      </Container>
    );
  }
}

export default DanhGiaComponent;
