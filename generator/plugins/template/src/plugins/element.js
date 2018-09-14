import Vue from 'vue';
<%_ if (opts.import === 'full') { _%>
import Element from 'element-ui';
<%_ } else { _%>
import {
  Col, Row, Menu, Container,
  Submenu, Dropdown, DropdownMenu,
  DropdownItem, MenuItem, Tabs,
  TabPane, Input, Card,
  Form, FormItem, Select,
  Button, ButtonGroup, Table, TableColumn,
  Option, Upload, Dialog,
  Loading, Tag, Popover,
  RadioGroup, RadioButton, DatePicker,
  Switch, Cascader, Radio,
  CheckboxGroup, Checkbox, OptionGroup,
  Pagination, Alert, Tooltip,
  Message, MessageBox, Notification,
  Progress, TimePicker, MenuItemGroup,
  Collapse, CollapseItem,
  InputNumber, Steps, Step,
  Header, Badge, Main,
  Footer, Tree, Aside,
} from 'element-ui';
<%_ } _%>
import 'element-ui/lib/theme-chalk/index.css';
<%_ if (opts.i18n !== 'none') { _%>
import i18n from '../i18n';
import locale from 'element-ui/lib/locale';
import zhLang from 'element-ui/lib/locale/lang/zh-CN';
import enLang from 'element-ui/lib/locale/lang/en';
<%_ } _%>

<%_ if (opts.import === 'full') { _%>
Vue.use(Element);
<%_ } else { _%>
Vue.use(Col);
Vue.use(Header);
Vue.use(Row);
Vue.use(Menu);
Vue.use(Container);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Option);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Tag);
Vue.use(Popover);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(Cascader);
Vue.use(Radio);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(OptionGroup);
Vue.use(Pagination);
Vue.use(Alert);
Vue.use(Tooltip);
Vue.use(Progress);
Vue.use(TimePicker);
Vue.use(MenuItemGroup);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(InputNumber);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Badge);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Tree);
Vue.use(Aside);

<%_ if (opts.i18n !== 'none') { _%>
Vue.prototype.$locale = {
  use(lang) {
    i18n.locale = lang;
    locale.use(lang === 'zh-CN' ? zhLang : enLang);
  },
  current() {
    return i18n.locale;
  },
};

locale.use(i18n.locale === 'zh-CN' ? zhLang : enLang);
<%_ } _%>

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$notify = Notification;
<%_ } _%>