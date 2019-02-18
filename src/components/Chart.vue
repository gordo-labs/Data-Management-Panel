<script>
    import { Line, mixins } from 'vue-chartjs';

    export default {
        extends: Line,
        // mixins: [mixins.reactiveProp],
        props: ['data', 'options'],
        mounted () {
            console.log(this.data);
            console.log(this.options);
            this.renderChart(this.data, this.options)
        }
    }
</script>