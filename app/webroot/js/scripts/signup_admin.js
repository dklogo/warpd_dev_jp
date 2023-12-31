var SignupAdmin = {
    form:null,

    init:function () {
        var self = this;
        self.form = $('#form');

        $('#submit-btn').click(function () {
            self.form.submit();
        });

        self.form.validate({
            rules:{
                fname:{
                    minlength:2,
                    required:true
                },
                lname:{
                    minlength:2,
                    required:true
                },
                username:{
                    minlength:2,
                    required:true
                },
                password:{
                    minlength:2,
                    required:true
                },
                email:{
                    minlength:2,
                    required:true
                },
                active_mobile:{
                    minlength:2,
                    required:true
                }
            },
            focusCleanup:false,

            highlight:function (label) {
                $(label).closest('.control-group').removeClass('success').addClass('error');
            },
            success:function (label) {
                label
                    .text('OK!').addClass('valid')
                    .closest('.control-group').addClass('success');
            },
            errorPlacement:function (error, element) {
                error.appendTo(element.parents('.controls'));
            }
        });
    },

    /**
     * Function to display error messages
     * @param string message the error to display
     */
    displayMsg:function (title, message, type) {
        var self = this;
        var $class = {'success':'alert-success', 'error':'alert-error', 'warning':'alert-block', 'info':'alert-info'};
        $("#loginmsg div.alert h4").html(title);
        $("#loginmsg div.alert span").html(message);
        if ($("#loginmsg div.alert").hasClass('alert-success')) {
            $("#loginmsg div.alert").removeClass('alert-success');
        }
        if ($("#loginmsg div.alert").hasClass('alert-error')) {
            $("#loginmsg div.alert").removeClass('alert-error');
        }
        if ($("#loginmsg div.alert").hasClass('alert-block')) {
            $("#loginmsg div.alert").removeClass('alert-block');
        }
        if ($("#loginmsg div.alert").hasClass('alert-info')) {
            $("#loginmsg div.alert").removeClass('alert-info');
        }
        //$("#loginmsg div.alert").removeClass('alert-success','alert-error','alert-block','alert-info');
        $("#loginmsg div.alert").addClass($class[type]);
        $("#loginmsg").show();
    },

    hideMsg:function (title, message, type) {
        var self = this;
        $("#loginmsg").hide();
    }
};

/* when the page is loaded */
$(document).ready(function () {
    SignupAdmin.init();
});