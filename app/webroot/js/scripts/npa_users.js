var JSObj = {

    selected_row_id:null,
    objGrid:null,

    init:function () {
        var self = this;

        var btn_actions = [];
        if(inArray('A',permissions)){
            btn_actions.push({type:'buttom', name:'New', bclass:'add', onpress:self.handleGridEvent});
            btn_actions.push({separator:true});
        }
        if(inArray('E',permissions)){
            btn_actions.push({type:'buttom', name:'Edit', bclass:'edit', onpress:self.handleGridEvent});
            btn_actions.push({separator:true});
        }
        if(inArray('A',permissions) || inArray('E',permissions)){
            btn_actions.push({type:'buttom', name:'Save', bclass:'save', onpress:self.handleGridEvent});
            btn_actions.push({separator:true});
            btn_actions.push({type:'buttom', name:'Cancel', bclass:'cancel', onpress:self.handleGridEvent});
            btn_actions.push({separator:true});
        }
        if(inArray('D',permissions)){
            btn_actions.push({type:'buttom', name:'Delete', bclass:'delete', onpress:self.handleGridEvent});
            btn_actions.push({separator:true});
        }
        if(inArray('E',permissions)){
            btn_actions.push({type:'buttom', name:'Reset Password', bclass:'enable', onpress:self.handleGridEvent});
            btn_actions.push({separator:true});
        }

        self.objGrid = $('#flex').flexigrid({
            url:$('#table-url').val(),
            dataType:'json',
            colModel:[
                {display:'ID', name:'id', width:20, sortable:false, align:'left', hide:true},
                {display:'First Name', name:'fname', width:150, sortable:false, align:'center', hide:false, editable:{form:'text', validate:'empty', defval:''}},
                {display:'Last Name', name:'lname', width:150, sortable:true, align:'center', hide:false, editable:{form:'text', validate:'empty', defval:''}},
                {display:'User Name', name:'username', width:150, sortable:true, align:'center', hide:false, editable:{form:'text', validate:'empty', defval:''}},
                {display:'Group', name:'group_id', width:150, sortable:true, align:'center', hide:false, editable:{form:'select', validate:'empty', defval:'', options:groups}},
                {display:'Active', name:'active', width:100, sortable:true, align:'center', hide:false, editable:{form:'select', validate:'', defval:'', options:account_active}}
            ],
            formFields:btn_actions,
            /*searchitems:[
             {display:'Proforma Number', name:'invoice_number', isdefault:true}
             ],*/
            checkboxSelection:true,
            editablegrid:{
                use:true,
                url:$('#table-editable-url').val(),
                add:inArray('A',permissions),
                edit:inArray('E',permissions)
            },
            columnControl:false,
            sortname:"id",
            sortorder:"desc",
            usepager:true,
            useRp:true,
            rp:15,
            showTableToggleBtn:false,
            height:300,
            subgrid:{
                use:false
            },
            callback:function ($type,$title,$message) {
                jLib.message($title, $message, $type);
            }
        });

        $("#reset_modal form").submit(function(e) {
            e.preventDefault();
            self.doResetPassword();
        });
    },

    handleGridEvent:function (com, grid, json) {
        if (com == 'New') {
            JSObj.objGrid.flexBeginAdd();
        }
        else if (com == 'Edit') {
            var row = FlexObject.getSelectedRows(grid);
            JSObj.objGrid.flexBeginEdit(row[0]);
        }
        else if (com == 'Save') {
            JSObj.objGrid.flexSaveChanges();
        }
        else if (com == 'Cancel') {
            JSObj.objGrid.flexCancel();
        }
        else if (com == 'Delete') {
            if (FlexObject.rowSelectedCheck(JSObj.objGrid,grid)) {
                JSObj.delete_(grid);
            }
        }
        else if (com == 'Reset Password') {
            if (FlexObject.rowSelectedCheck(JSObj.objGrid,grid,1)) {
                var row = FlexObject.getSelectedRowIds(grid);
                JSObj.resetPass(row[0]);
            }
        }
    },

    resetPass:function(id){
        document.getElementById('reset_form').reset();
        $('#reset_modal #id').val(id);
        $('#reset_modal').modal({
            backdrop: 'static',
            show: true,
            keyboard: true
        });
    },

    /**
     * Triggers steps to make AJAX call to credit student account
     */
    doResetPassword: function() {
        var self = this;
        var query = $("#reset_modal form").serialize();
        var url = $("#reset_modal #reset_pass_btn").attr("href");

        $.ajax({
            type: 'post',
            url: url,
            data: query,
            dataType: 'json',
            success: function(data) {
                var content = data.msg;
                $("#reset_modal").modal("hide");
                if(data.code == 0){
                    self.objGrid.flexNotify('Status', content, 'success');
                }
                else{
                    self.objGrid.flexNotify('Status', content, 'error');
                }
            },
            error: function() {
                self.objGrid.flexNotify('Status', 'Network Failure', 'error');
            }
        });
    },



    delete_:function (grid) {
        var self = this;
        var url = $('#delete_url').val();
        jLib.do_delete(url, grid);
    }
};

/* when the page is loaded */
$(document).ready(function () {
    JSObj.init();
});