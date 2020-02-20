import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AruDisplayer extends Vue {
    @Prop()
    private aruHenkanMap!: any;

    private colorClass(aruHenkan: any): string {
        if (aruHenkan['pos'] === '名詞') {
            return 'blue--text headline';
        }
        return '';
    }
}