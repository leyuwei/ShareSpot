// API for Wutong Chain
// Developed by Yuwei Le, Ruiwei Guo, Zheng Gao, Zibo Yang, Yan Wang at Oct. 2020.
// Related copyrights are reserved.

var contract_name = "ff254cc5d927aeca4bc0cdbdd3e9d23755175c02443df8b7ac687f93dcf806d5";
var host = "dev-env.wutongchain.com";
var port = "59301";
var proxy = ""
var baselink = "http://" + host + ":" + port;


function request(method, url, paras, callback_success) {
    // paras is a dictionary
    var dat = new FormData();
    dat.append('method', method);
    dat.append('url', baselink+url);
    dat.append('data', JSON.stringify(paras));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', proxy, true);
    xhr.setRequestHeader("charset", "utf-8");
    xhr.send(dat);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback_success(JSON.parse(xhr.responseText));
        }
    };
}


////////////////////////////////////////
////////////////  Block ////////////////
////////////////////////////////////////

function get_block_height(callback_success) {
    var apilink = "/v2/block/height";
    request('get', apilink, {}, callback_success);
}

function get_block_by_id(block_id, callback_success) {
    var apilink = "/v2/block/detail/" + block_id;
    request('get', apilink, {}, callback_success);
}

function get_block_by_height(block_height, callback_success) {
    var apilink = "/v2/block/detail/" + block_height;
    request('get', apilink, {}, callback_success);
}

function get_block_height_by_txid(txid, callback_success) {
    var apilink = "/v2/block/height/" + txid;
    request('get', apilink, {}, callback_success);
}

function get_block_id_by_txid(txid, callback_success) {
    var apilink = "/v2/block/tx/index/" + txid;
    request('get', apilink, {}, callback_success);
}


////////////////////////////////////////
/////////////  Transaction /////////////
////////////////////////////////////////

function set_tx(data, pubKeys, callback_success) {
    // pubKeys is a list of strings
    var apilink = "/v2/tx/store";
    var dic = {};
    dic['data'] = data;
    if (pubKeys !== "" && pubKeys != null)
        dic['pubKeys'] = pubKeys;
    request('post', apilink, dic, callback_success);
}

function get_private_tx(txid, priKey, password, callback_success) {
    var apilink = "/v2/tx/store/query";
    var dic = {};
    dic['txId'] = txid;
    dic['priKey'] = priKey;
    if (password !== "" && password != null)
        dic['password'] = password;
    request('post', apilink, dic, callback_success);
}

function get_tx_by_txid(txid, callback_success) {
    var apilink = "/v2/tx/detail/" + txid;
    request('get', apilink, {}, callback_success);
}

function get_raw_tx_by_txid(txid, callback_success) {
    var apilink = "/v2/tx/raw/" + txid;
    request('get', apilink, {}, callback_success);
}

function get_tx_status_by_txid(txid, callback_success) {
    var apilink = "/v2/tx/inlocal/" + txid;
    request('get', apilink, {}, callback_success);
}


////////////////////////////////////////
//////////////  Contract ///////////////
////////////////////////////////////////

function set_smart_contract(category, file, version, callback_success) {
    var apilink = "/v2/tx/sc/install";
    var dic = {};
    dic['category'] = category;
    dic['file'] = file;
    if (version !== "" && version != null)
        dic['version'] = version;
    request('post', apilink, dic, callback_success);
}

function invoke_dynmethod_smart_contract(category, name, method, args, version, callback_success) {
    // dynamic method calls of a smart contract
    // args is an Array
    var apilink = "/v2/tx/sc/invoke";
    var dic = {};
    dic['category'] = category;
    dic['name'] = name;
    dic['method'] = method;
    dic['args'] = args;
    if (version !== "" && version != null)
        dic['version'] = version;
    request('post', apilink, dic, callback_success);
}

function invoke_stamethod_smart_contract(category, name, method, args, version, callback_success) {
    // static/query method calls of a smart contract
    var apilink = "/v2/tx/sc/query";
    var dic = {};
    dic['category'] = category;
    dic['name'] = name;
    dic['method'] = method;
    dic['args'] = args;
    if (version !== "" && version != null)
        dic['version'] = version;
    request('post', apilink, dic, callback_success);
}

function destroy_smart_contract(category, name, callback_success) {
    // static/query method calls of a smart contract
    var apilink = "/v2/tx/sc/destroy";
    var dic = {};
    dic['category'] = category;
    dic['name'] = name;
    request('post', apilink, dic, callback_success);
}


////////////////////////////////////////
///////////////  Others ////////////////
////////////////////////////////////////

function get_system_health(callback_success) {
    var apilink = "/v2/chain/apihealth";
    request('get', apilink, {}, callback_success);
}

function get_peerlist(callback_success) {
    var apilink = "/v2/peerlist";
    request('get', apilink, {}, callback_success);
}

function get_peerlist_detailed(callback_success) {
    var apilink = "/v2/memberlist";
    request('get', apilink, {}, callback_success);
}
