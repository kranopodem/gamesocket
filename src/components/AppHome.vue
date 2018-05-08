<template>
  <v-container grid-list-md>
    <v-flex xs2 offset-sm5>
      <v-card color="red" class="white--text">
        <v-card-text class="display-2">{{roomCode}}</v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs4 offset-sm4>
      <v-form v-model="valid">
      <v-text-field required :rules="nameRules" v-model="userName" class="input-group--focused" name="input-1-3" label="Введите имя" single-line>
      </v-text-field>
      <v-text-field v-model="room" class="input-group--focused" maxlength=4 name="input-1-3" label="Введите код" single-line>
      </v-text-field>
      </v-form>
    </v-flex>
    <ol>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{user.role}}
      </li>
    </ol>
    <v-flex xs6 offset-sm3>
      <v-btn :disabled="!valid" v-if="seen" color="indigo white--text" large v-on:click="createRoom">
        Создать Сервер
      </v-btn>
      <v-btn v-if="seen" color="green white--text" large v-on:click="connectRoom">
        Подключиться
      </v-btn>
    </v-flex>

    <v-flex xs6 offset-sm3>
      <v-btn disabled color="black--text" large>Больше</v-btn>
      <v-btn disabled color="black--text" large>Меньше</v-btn>
    </v-flex>

    <v-flex xs6 offset-sm3>
      <v-text-field v-model="number" class="input-group--focused" name="input-1-3" label="Введите число" single-line></v-text-field>
      <v-btn v-on:click="tryGuess" color="red white--text" large>
        Отправить
      </v-btn>
    </v-flex>

    <v-data-iterator content-tag="v-layout" row wrap :items="items" :total-items="99">
      <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3>
        <v-card>
          <v-card-title class="text-md-center">
            <h4 style="width:100%;" class="text-md-center display-1">{{ props.item.name }}</h4>
          </v-card-title>
          <v-divider></v-divider>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>
<script>
  export default {
    sockets: {
      message: function (users) {
        this.users = users;
        console.log(users)
      },
      errors: function (message){
        alert(message)
      }
    },
    methods: {
      connectRoom: function () {
        this.$socket.emit('joinRoom', this.room, this.userName);
      },
      
      createRoom: function () {
        var roomCode = Math.floor(1000 + Math.random() * 9000);//Генерация кода комнаты
        this.roomCode = roomCode;
        this.seen = false;
        this.$socket.emit('createRoom', roomCode, this.userName);
        console.log(this.roomCode);
      },
      tryGuess: function () {
        this.$socket.emit('tryGuess', this.number);
        console.log(this.number);
      }
    },
    data: () => ({
      number: 'Введите число',
      valid: false,
      nameRules: [
        v => !!v || 'Имя обязательно!',
      ],
      roomCode: '',
      room: '',
      userName: '',
      seen: true,
      users: [],
      items: [{
          value: false,
          name: 'Frozen Yogurt',
        },
        {
          value: false,
          name: 'Ice cream sandwich',
        },
        {
          value: false,
          name: 'Eclair',
        },
        {
          value: false,
          name: 'Cupcake',
        },
        {
          value: false,
          name: 'Gingerbread',
        },
        {
          value: false,
          name: 'Jelly bean',
        },
        {
          value: false,
          name: 'Lollipop',
        },
        {
          value: false,
          name: 'Honeycomb',
        },
        {
          value: false,
          name: 'Donut',
        },
        {
          value: false,
          name: 'KitKat',
        }
      ]
    })
  }


</script>
