<template>
    <VApp id="inspire">
        <VContent>
           
            <VContainer slide-y-reverse-transition :style="{ backgroundImage: `url(${bg})`, height:'100%',width:'100%',backgroundSize: 'cover' }" fluid fill-height >
                <VLayout style="text-align:center;" justify-center align-content-start wrap>
                    <VFlex  style="text-align:center;margin:50px;" xs12>
                        <img  style="max-width:350px;background-color:#00000052" :src="logo">
                    </VFlex>

                    <VFlex xs12 sm8 md4>
                        <VCard dark class="elevation-12">
                            <VToolbar dark color="primary">
                                <VToolbarTitle>Login</VToolbarTitle>
                                <VSpacer></VSpacer>
                        
                            </VToolbar>
                            <VCardText>
                                <VForm>
                                    <VTextField v-model="auth.phone" prepend-icon="mdi-account" name="login" label="Phone Number" type="tel"></VTextField>
                                    <VTextField v-model="auth.password" prepend-icon="mdi-lock" name="password" label="Password" id="password" type="password"></VTextField>
                                </VForm>
                            </VCardText>
                            <VCardActions>
                                <VBtn href="/signup" text color="accent">I don't have an account</VBtn>
                                <VSpacer></VSpacer>
                                <VBtn outlined :loading="loading" @click="login()" color="primary">Login</VBtn>
                            </VCardActions>
                        </VCard>
                    </VFlex>
                </VLayout>
            </VContainer>
        </VContent>
    </VApp>
</template>

<script>
    import bg from '@/images/1.jpg'
    import logo from '@/assets/logo.png'
    export default {

        data: () => ({
            drawer: null,
            bg,
            logo,
            auth:{},
            loading:false
        }),
        props: {
            source: String,
            snack: Function
        },
        methods: {
            login(){
                this.loading = true;
                  localStorage.setItem('fyre-user', JSON.stringify(this.auth))
                    this.$router.push('/tickets');
                        this.loading = false;
                // this.$http.post('/users/login', this.auth).then((resp)=>{
                //     this.loading = false;
                //     console.log(resp.data)
                //     if(!resp.data.status){
                //         this.snack(resp.data.message, 'error')
                //         return;
                //     }
                //     localStorage.setItem('fyre-user', JSON.stringify(resp.data.payload))
                //     this.$router.push('/tickets');
                // }).catch((err)=>{
                //     this.loading = false;
                //      this.snack('A network error occured', 'error')
                // })
            }
        }
    }
</script>