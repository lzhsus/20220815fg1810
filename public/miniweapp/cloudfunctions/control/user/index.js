const invoke = require('./invoke/index');
const boast = require('./boast/index');
const emotional = require('./emotional/index');
const info = require('./info/index');
const sign = require('./sign/index');
const _send = require('./_send/index');
const create = require('./create/index');
const ranking = require('./ranking/index');
const rankinglist = require('./rankinglist/index');
const verse = require('./verse/index');
const manager_log = require('./manager_log/index');
const translate_log = require('./translate_log/index');
const active = require('./active/index');
const chongwuupdata = require('./chongwuupdata/index');

const petDetail = require('./petDetail/index');
const petList = require('./petList/index');
const userlist = require('./userlist/index');
const updata = require('./updata/index');
const updataadmin = require('./updataadmin/index');

module.exports = {
    invoke:invoke,
    boast:boast,
    emotional:emotional,
    info:info,
    sign:sign,
    create:create,
    ranking:ranking,
    rankinglist:rankinglist,
    verse:verse,
    manager_log:manager_log,
    translate_log:translate_log,
    active:active,
    chongwuupdata:chongwuupdata,
    _send:_send,
    petDetail:petDetail,
    petList:petList,
    updata:updata,
    userlist:userlist,
    updataadmin:updataadmin
}