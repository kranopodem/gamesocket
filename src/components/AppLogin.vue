<template>
    <v-container>
            <v-form v-model="valid">
                    <v-text-field
                      label="Name"
                      v-model="name"
                      :rules="nameRules"
                      :counter="10"
                      required
                    ></v-text-field>
                    
                    <v-text-field
                      label="E-mail"
                      v-model="email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <v-btn class="green white--text">Submit</v-btn>
            </v-form>
    </v-container>
        
      </template>

      <script>
            export default {
              data: () => ({
                valid: false,
                name: '',
                nameRules: [
                  v => !!v || 'Name is required',
                  v => v.length <= 10 || 'Name must be less than 10 characters'
                ],
                email: '',
                emailRules: [
                  v => !!v || 'E-mail is required',
                  v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ]
              })
            }
        </script>