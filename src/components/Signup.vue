<template>
  <VApp id="inspire">
    <VContent>
      <VContainer
        slide-x-transiton
        :style="{ backgroundImage: `url(${bg})`, height:'100%',width:'100%',backgroundSize: 'cover' }"
        fluid
        fill-height
      >
        <VLayout style="text-align:center;" align-content-start justify-center wrap>
          <VFlex style="text-align:center;margin:50px;" xs12>
            <img style="max-width:350px;background-color:#00000052" :src="logo" />
          </VFlex>
          <VFlex xs12 sm8 md4>
            <VCard dark class="elevation-12">
              <VToolbar dark color="primary">
                <VToolbarTitle>Login</VToolbarTitle>
                <VSpacer></VSpacer>
              </VToolbar>
              <VCardText>
                <VForm autocomplete="off">
                  <VTextField
                    prepend-icon="mdi-account"
                    name="name"
                    label="Name"
                    placeholder="John Doe"
                    v-model="auth.name"
                    type="text"
                  ></VTextField>
                  <VTextField
                    v-model="auth.phone"
                    prepend-icon="mdi-phone"
                    label="Phone Number"
                    type="tel"
                  ></VTextField>
                  <VTextField
                    prepend-icon="mdi-lock"
                    label="Password"
                    v-model="auth.password"
                    id="password"
                    type="password"
                  ></VTextField>
                </VForm>
              </VCardText>
              <VCardActions>
                <VBtn href="/login" text color="accent">I already have an account</VBtn>
                <VSpacer></VSpacer>
                <VBtn :loading="loading" @click="signup()" outlined color="primary">REGISTER</VBtn>
              </VCardActions>
            </VCard>
          </VFlex>
        </VLayout>
      </VContainer>
    </VContent>
  </VApp>
</template>

<script>
import bg from "@/images/3.jpg";
import logo from "@/assets/logo.png";
export default {
  data: () => ({
    drawer: null,
    bg,
    logo,
    loading: false,
    auth: {}
  }),
  props: {
    source: String,
    snack: Function
  },
  methods: {
    signup() {
      this.loading = true;
      this.$http
        .post("/users/signup", this.auth)
        .then(resp => {
          this.loading = false;
          console.log(resp.data);
          if (!resp.data.status) {
            this.snack(resp.data.message, "error");
            return;
          }
          // localStorage.setItem("fyre-user", JSON.stringify(resp.data.payload));
          this.$router.push("/login");
        })
        .catch(err => {
          this.loading = false;
          this.snack("A network error occured", "error");
        });
    }
  }
};
</script>