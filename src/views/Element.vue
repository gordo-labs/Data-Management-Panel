<template>
  <v-content class="asset-page" >
    <v-progress-linear indeterminate v-if="!element_UI.is_loaded"></v-progress-linear>
<div v-if="element_UI.is_loaded">
    <v-card v-if="element.currency" class="user-header align-start pa-3" ref="user_header"
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

    <v-card class="pa-3" v-if="element_UI.notes_loaded">
      <v-card-title>
        <h2>Notes</h2>
      </v-card-title>
      <v-card-text class="notes-list">
        <p v-for="item in notes">
          <span>{{item.date | moment('D MMM YY | HH:mm')}}</span>
          {{item.text}}
        </p>
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
</div>
  </v-content>
</template>

<script>

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
    element_UI() {
      return this.$store.getters.ELEMENT_UI;
    },
    notes() {
      return this.$store.getters.NOTES;
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
      this.$store.commit("setElementNoteLoading", false);
      console.log(this.$store.getters.NOTES);
      const note_ = {
        id: this.element.id,
        date: new Date(),
        text: note
      };
      this.$store.commit("addNote", note_);
      this.$store.commit("setElementNoteLoading", true);
    },
    moveElement(x){
      this.$store.commit("setElementChart", false);
      this.$store.commit("moveArray", x);
      this.$store.dispatch("getElementData", this.$store.getters.NEXT_ELEMENT.id);
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
