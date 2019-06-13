// type : LIB
//

JMVC.extend('fvalidation', {

    rule_bucket: {},

    rules: {},

    error_color: '#ff8888',
    error_color2: '#EFC765',
    error_brd_color: 'red',

    // if o is
    // a string : is meant to be a registered bucket
    // a object : is meant to be used as a temporary rule object
    validate: function (o) {
        var ret = true,
            trg = false,
            valore, temp;

        switch (true) {
        case JMVC.util.isObject(o):
            this.rules = o;
            break;
        case JMVC.util.isTypeOf(o, 'string') && this.rule_bucket[o]:
            this.rules = this.rule_bucket[o];
            break;
        case typeof (o) === 'undefined':
            alert('no rules');
            return false;
        }

        /// remove all notifies not only those of that form
        JMVC.dom.remove('.jmvc_notify_err');

        for (valore in this.rules) {
            temp = this.check(valore, this.rules[valore]);
            if (temp === false) ret = false;
        }
        // this.notify(!ret);
        return ret;
    },

    // restituisce true in caso positivo
    check: function (id, tipo) {
        var ret = false,
            el = JMVC.dom.find('#' + id),

            valore = JMVC.dom.val(el);

        // "valore" lo metto nello switch in modo che caso per caso decido
        // un checkbox e un text hanno un "valore" differente da considerare
        switch (tipo) {
        case 'color':
            ret = (valore.length == 6) && valore.match(/[0-9a-fxA-FX]{6}/);
            break;

        case 'string':
            ret = (valore.replace(/ /g, '') != '');
            break;
        case 'file_csv':
            ret = (valore.indexOf('.csv', 0) != '-1');
            break;
        case 'tel':
            ret = ValidateNo(valore, '1234567890+- ');
            break;
        case 'cell':
            ret = (valore > 3000000000) && (valore < 4000000000);
            break;
        case 'num_5':
            ret = (valore.match(/\d{5}/) != null) && valore.length == 5;
            break;
        case 'num':
            if (valore == '') ret = false;
            else ret = (valore.match(/\d*/) != null);
            break;
        case 'string_4':
            ret = (valore.length == 4);
            break;
        case 'string_min_8':
            ret = (valore.length >= 8);
            break;

        case 'email':
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            ret = (valore.match(re) !== null);
            break;

        case 'date':
            ret = valore.match(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/);
            break;
        case 'chbx':
            ret = el.is(':checked');
            break;

            // indipendenti
        case 'url':

            // from http://forums.devshed.com/javascript-development-115/javascript-url-validation-349330.html
            var urlregex = /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/;
            ret = urlregex.test(valore);
            // return jQuery("#"+id).val().match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
            break;
        }
        ret = !!ret;
        this.colora_bord(id, ret);
        return ret;
    },

    // mi dice se esiste una regola per validare l'elemento
    is_validable: function (elem) {
        var arrval = ['string', 'file_csv', 'tel', 'cell', 'num_5', 'string_4', 'string_min_8', 'email', 'cfis', 'cid', 'date', 'iban', 'chbx', 'piva', 'cfispiva', 'url'],
            ret = false;
        for (var i in arrval) {
            if (arrval[i] == elem) { return true; }
        }
        return ret;
    },

    // per i numeri di telefono
    ValidateNo: function (NumStr, str) {
        if (!NumStr) { return false; }
        for (var Idx = 0; Idx < NumStr.length; Idx += 1) {
            var Char = NumStr.charAt(Idx),
                Match = false,
                Idx1,
                l = str.length;

            for (Idx1 = 0; Idx1 < l; Idx1 += 1) {
                if (Char == str.charAt(Idx1)) {
                    Match = true;
                }
            }
            if (!Match) {
                return false;
            }
        }
        return true;
    },

    // lo aggiunge e se esiste sovrascrive il tipo
    add_element: function (el, ty) {
        this.validates[el] = ty;
    },

    rem_element: function (el) {
        delete this.validates[el];
    },

    rem_all: function () {
        this.validates = {};
    },

    rew_element: function (el, ty) {
        this.add_element(el, ty);
    },

    colora_bord: function (id, boole) {
        if (!boole) { JMVC.dom.insertAfter(JMVC.dom.create('span', { 'title': '', 'class': 'jmvc_notify_err', 'id': id + '_img' }, '&laquo;'), JMVC.dom.find('#' + id)); }
        // else
        //	JMVC.dom.remove('#'+id+'_img');
    },

    colora_bord_opt: function (id, boole) {
        document.getElementById(id).style.backgroundColor = (boole == false) ? error_color2 : '';
    },

    colora_chbx: function (id, boole) {
        // JMVC.css.style()

        // jQuery('#'+id).parent().css({'background-Color':''+((boole==false)?error_brd_color:"")});
    },

    //
    reset_form: function () {
        for (var valore in this.validates) {
            switch (this.validates[valore]) {
            case 'chbx':
                JMVC.dom.attr(
                    JMVC.dom.find('#' + valore),
                    'checked',
                    ''
                );
                break;
            default:
                jQuery('#' + valore).val('');
            }
        }
    }/*,
	notify : function(vedi){
		if(vedi)JMVC.dom.find('#notify').style.display = 'block';
		else JMVC.dom.find('#notify').style.display = 'none';
	} */

});
