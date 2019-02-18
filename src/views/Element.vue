<template>
  <v-content class="asset-page" >
    <!--<div d-flex>-->
    <!--<v-progress-circular-->
            <!--class="mt-4"-->
            <!--v-if="!loading"-->
            <!--indeterminate-->
            <!--color="primary"-->
    <!--&gt;</v-progress-circular>-->
    <!--</div>-->
    <!--<div v-if="loading">-->

    <v-card class="user-header align-start pa-3" ref="user_header"
            v-bind:style="{ borderBottom: '4px solid ' +  element.currency.color}">

      <!--title-->
      <v-card-title primary-title>
        <h1 class="display-2">{{element.name}}</h1>
      </v-card-title>

      <!--forward & backward routing-->
      <v-card-actions class="ma-3 hidden-md-and-down">
        <p class="grey--text mr-3">id: {{element.id}}</p>
        <v-btn outline fab small
               @click="moveElement(-1)"
               @keydown.37="moveElement(-1)">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn outline fab small
               @click="moveElement(1)"
               @keydown.39="moveElement(1)">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-card-actions>

    </v-card>

    <v-card class="pa-3">

      <v-card-title>
        <h2>Details:</h2>
      </v-card-title>
      <v-card-text class="details_cont">
        <div v-if="element.currency"><p offset>Currency: </p><span>{{element.currency.name}} - {{element.currency.symbol}}</span></div>
        <div v-if="element.issuer"> <p offset>Issuer: </p><span>{{element.issuer.name}}</span></div>
        <div v-if="element.isin">  <p offset>ISIN: </p><span>{{element.isin}}</span></div>
        <div v-if="element.region">   <p offset>Region: </p><span>{{element.region.name}}</span></div>
        <div v-if="element.risk_family">   <p offset>Risk Family: </p><span>{{element.risk_family.name}}</span></div>
        <div v-if="element.sector">   <p offset>Sector: </p><span>{{element.sector.name}}</span></div>
      </v-card-text>

    </v-card>

    <v-card class="pa-3">
      <v-card-title>
        <h2>Notes</h2>
      </v-card-title>
      <v-card-text class="notes-list">
        <p v-for="note in element.notes"><span>{{note.date | moment('D MMM YY | HH:mm')}}</span> {{note.text}}</p>
      </v-card-text>
      <v-card-text>
        <textarea class="userNotes" v-model="note" placeholder="Write your note"></textarea>
      </v-card-text>
      <v-card-text class="">
        <v-btn outline round @click="addNoteButton(note)">Add note</v-btn>
      </v-card-text>
    </v-card>

    <v-card>
      <chart :data="chart.chartdata" :options="chart.options"></chart>
    </v-card>

    <!--</div>-->
  </v-content>
</template>

<script>
import baseService from "../services/base-service.js";
import uiService from "../services/ui-service.js";

export default {
  data() {
    return {
      dialogData: {},
      note: null,
    };
  },
  created() {
    console.log(this.$route.params.id);
    this.$store.dispatch("getElementData", this.$route.params.id);
  },
  computed: {
    element() {
      return this.$store.getters.SELECTED_ELEMENT;
    },
    chart(){
      return {
        chartdata: {
          labels: this.element.chartData.dates,
          datasets: [
            {
              label: 'Price',
              backgroundColor: '#c8c3c9',
              data: this.element.chartData.prices
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }
  },
  methods: {
    addNoteButton(note) {
      const note_ = {
        // elementId: this.element.id,
        date: new Date(),
        text: note
      };
      console.log(note_);
      this.$store.commit("addNote", note_);
    },
    moveElement(x){
      this.$store.commit("moveArray", x);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/module.scss";

.asset-page {
  .notes-list{
    p{
      span{
        color: #aaaaaa;
        padding: 4px 8px;
        border-radius: 4px;
        margin-right: 5px;
        font-size: 12px;
      }
    }
  }

.user-header {
  justify-content: space-between;
  display: flex; // position: absolute;
  // overflow: hidden;
  width: 100%;
  a {
    text-decoration: none;
    color: black;
  }
}

.data {
  padding-top: 150px;
}

.list-data {
  width: 100%;
  p {
    span:last-child {
      font-weight: 500;
      color: black;
    }
  }
  div {
  }
  hr {
    margin: 10px 0;
  }
}

.details_cont {
  span {
    font-weight: bold;
    margin-left: 5px;
  }
  div {
    display: flex;
  }
}
.userNotes {
  border: 2px solid rgb(215, 215, 215);
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 5px;
}


}
</style>
