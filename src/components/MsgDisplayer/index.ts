import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MsgDisplayer extends Vue {
    @Prop()
    private message!: string;
}