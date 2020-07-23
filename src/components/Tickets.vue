<template>
  <v-app id="inspire">
    <v-content dark>
      <v-toolbar>
      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
      </v-toolbar-items>

      <template >
        <v-btn @click="logout()" color="primary">
          LOG OUT
        </v-btn>
      </template>
    </v-toolbar>
      <v-container
        fluid
        fill-height
        :style="{ backgroundImage: `url(${bg})`, height:'100%',width:'100%',backgroundSize: 'cover' }"
      >
        <v-layout row wrap dense>
          <v-flex style="padding:2px 50px;" xs12 md6 lg3 v-for="(item, i) in tickets" :key="i">
            <v-card class="mx-auto my-12">
              <v-img height="250" :src="item.src"></v-img>

              <v-card-title>{{item.title}}</v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating
                    full-icon="mdi-fire"
                    empty-icon="mdi-flash-outlin"
                    :value="item.rating"
                    color="amber"
                    dense
                    readonly
                    size="24"
                  ></v-rating>
                </v-row>

                <div>{{item.description}}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-title class="subheading">Festival Date</v-card-title>

              <v-card-text>
                <v-chip-group v-model="item.selection" active-class="primary white--text" column>
                  <v-chip disabled>{{item.dates[0]}}</v-chip>

                  <v-chip>{{item.dates[1]}}</v-chip>

                  <v-chip>{{item.dates[2]}}</v-chip>
                </v-chip-group>
              </v-card-text>

              <v-card-actions>
                <v-btn text>GHS {{item.amount}}</v-btn>
                <v-spacer></v-spacer>

                <v-btn color="primary" text @click="book(item)">Book ticket</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-dialog v-model="checkoutDialog" width="500">
        <v-card color="white">
          <v-card-title color="transparent" primary-title></v-card-title>

          <v-card-text>
            <v-card v-if="paymentStep == 0" color="black" style="padding:5px;" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <strong>
                    <p class="overline">{{selection.title}}</p>
                  </strong>

                  <p class="overline" v-text="selection.description.slice(0,100)+ '. . .'"></p>
                  <br />
                </div>

                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="selection.src"></v-img>
                </v-avatar>
              </div>
            </v-card>

            <v-card class="elevation-0" v-if="paymentStep == 1" style="padding:5px;">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <p style="text-align:center">
                    <v-icon
                      color="accent"
                      style="text-align:center;"
                      x-large
                    >mdi-information-outline</v-icon>
                  </p>
                  <strong>
                    <p style="text-align:center">Payment Initiated</p>
                  </strong>

                  <p
                    style="text-align:center"
                  >Please complete authorization process on your mobile phone</p>
                  <br />
                  <p style="text-align:center;">
                    <v-progress-circular color="grey" indeterminate></v-progress-circular>
                  </p>
                  <p style="text-align:center;" class="caption">Waiting for confirmation</p>
                </div>
              </div>
            </v-card>

            <v-card class="elevation-0" v-if="paymentStep == 2" style="padding:5px;">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div style="margin:auto;">
                  <p style="text-align:center">
                    <v-icon
                      :color="paymentStatus == 'success' ? 'green' : 'red'"
                      style="text-align:center;"
                      x-large
                    >{{paymentStatus == 'success' ? 'mdi-check-circle' : 'mdi-alert'}}</v-icon>
                  </p>
                  <strong>
                    <p
                      style="text-align:center"
                    >Payment {{paymentStatus == 'success' ? 'Successful' : 'Failed'}}</p>
                  </strong>
                  <br />
                </div>
              </div>
            </v-card>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text disabled>{{user.phone}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="paymentStep == 0"
              color="primary"
              :loading="loading"
              @click="buy(selection)"
            >{{'PAY ' + 'GHS ' + selection.amount}}</v-btn>
            <v-btn
              v-if="paymentStep == 1"
              color="primary"
              outlined
              :loading="loading"
              @click="confirm(selection)"
            >CONFIRM PAYMENT</v-btn>
            <v-btn
              v-if="paymentStep == 2"
              color="primary"
              outlined
              @click="checkoutDialog = false"
            >CLOSE</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import bg from "@/images/7.jpg";
import img_1 from "@/images/4.jpg";
import img_2 from "@/images/5.jpg";
import img_3 from "@/images/6.jpg";
export default {
  data: () => ({
    drawer: null,
    loading: false,
    checkoutDialog: false,
    bg,
    img_2,
    img_1,
    img_3,
    paymentStep: 0,
    paymentStatus: null,
    paymentObject: {},
    verifyCounter: 0,
    user: {},
    selection: { description: "" },
    tickets: [
      {
        src: img_1,
        amount: 0.2,
        selection: null,
        title: "Malakeith",
        rating: 5,
        description:
          " The biggest urban music beach festival in Europe is hosted in Portimão, famous for white sand and glistening sea. 300 days of sun a year and an average temperature of 26 degrees in August.",
        dates: ["July 1", "October 5", "December 27"]
      },
      {
        color: "#952175",
        user: null,
        amount: 0.1,
        src: img_2,
        selection: null,
        title: "Halcyon Days",
        rating: 4,
        dates: ["July 5", "October 22", "December 29"],
        description:
          "Once a year, tens of thousands of people gather in Tahiti’s Red Rock Desert to create Red Rock City, a temporary metropolis dedicated to community, art, self-expression, and self-reliance. In this crucible of creativity, all are welcome."
      }
    ]
  }),
  mounted: function() {
    let session = localStorage.getItem("fyre-user");
    if (!session) {
      this.$router.push("/login");
    }
    this.user = JSON.parse(session);
  },
  methods: {
    logout(){
      localStorage.removeItem('fyre-user');
      this.$router.push('/login');
    },
    book: function(event) {
      this.paymentStep = 0;
      this.paymentObject = {};
      this.paymentStatus = null;
      this.checkoutDialog = true;
      this.selection = event;
    },
    confirm() {
      this.verify(this.paymentObject.reference);
    },
    verify: function(reference) {
      this.verifyCounter++;
      this.loading = true;
      this.$http
        .get("/transaction/verify/" + reference)
        .then(response => {
          this.loading = false;
          if (!response.data.status) {
            this.snack(response.data.message);
            return;
          }
          if (response.data.payload.status == "ongoing") {
            if (this.verifyCounter > 9) {
              this.verifyCounter = 0;
              this.paymentStatus = response.data.payload.status;
              this.paymentStep = 2;
              return;
            }
            console.log("ongoing");
            this.verifyCounter;
            setTimeout(()=>{
              this.verify(reference);
            }, 1000)
              
            return;
          }
          this.paymentStatus = response.data.payload.status;
          this.paymentStep = 2;
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
          this.paymentStatus = "failed";
          this.paymentStep = 2;
          this.snack("A network error occured", "error");
        });
    },

    buy: function(evt) {
      this.loading = true;
      this.$http
        .post("/transaction/initialize/mtn_mobile_money", {
          phone: this.user.phone,
          amount: evt.amount
        })
        .then(response => {
          this.loading = false;
          if (response.data.status) {
            this.paymentObject = response.data.payload;
            this.paymentStep = 1;
            // alert(response.data.payload.display.message);
            setTimeout(() => {
              this.verify(response.data.payload.reference);
            }, 180000);
          } else {
            this.snack(response.data.message, "error");
          }
        })
        .catch(err => {
          this.loading = false;
          this.snack("A network error occured", "error");
        });
    }
  },
  props: {
    source: String,
    snack: Function
  }
};
</script>