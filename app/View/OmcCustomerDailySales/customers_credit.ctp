<style>
    .row-form {
        border-bottom: none;
        border-top: none;
        padding: 16px 10px;
    }
    .buttons li a{
        width: 100%;
        color: #fff;
        text-decoration: none;
    }
    .isw-edit {
        background-position: 10% 50% ;
    }
    .isw-cancel {
        background-position: 10% 50% ;
    }
    .isw-ok {
        background-position: 10% 50% ;
    }
    .selected td{
        color: #486B91;
        font-weight: bolder;
        background-color: #D1E0F0 !important;
    }
    tr:hover{
        cursor: pointer;
    }
    .error_span{
        color: #e9322d;
        font-style: italic;
        font-size: 11px;
    }

    td input,td select{
        margin: 0px !important;
        padding: 1px !important;
    }

    th,td{
        white-space: nowrap !important;
        padding: 2px  !important;
    }
    .table{
        width: 40%;
    }

</style>

<div class="workplace">

    <div class="page-header">
        <h1>OMC Credit Customers : <?php echo date('l jS F Y');?> <small> </small></h1>
    </div>

    <div class="row-fluid">

        <div class="span12">
            <div class="head clearfix">
                <div class="isw-list"></div>
                <!--<h1>Sales Record Sheet</h1>-->
                <ul class="buttons">
                    <?php
                    if(in_array('E',$permissions)){
                        ?>
                        <li><a href="javascript:void(0);" id="edit_row_btn" class="isw-edit"> &nbsp;  &nbsp; Edit Row</a></li>
                        <li><a href="javascript:void(0);" id="cancel_row_btn" class="isw-cancel"> &nbsp;  &nbsp; Cancel</a></li>
                        <li><a href="javascript:void(0);" id="save_row_btn" class="isw-ok"> &nbsp;  &nbsp; Save</a></li>
                    <?php
                    }
                    ?>
                </ul>
            </div>
            <div class="block-fluid">
                <div class="block-fluid" style="overflow-y: auto; border: none">
                <table id="" class="form-table table table-bordered">
                    <!--<thead>
                        <tr>-->
                           <!-- <?php
                            /* foreach($table_setup as $row){
                                */?>
                                    <th><?php /*echo $row['header'].' '.$row['unit'] ;*/?></th>
                                --><?php
                            /* }
                            */?>
                       <!-- </tr>
                    </thead>-->
                    <tbody>
                        <?php
                            $id = $form_data['OmcCustomersCredit']['id'];
                            foreach($table_setup as $row){
                                $header = $row['header'];
                                $field = $row['field'];
                                $format = $row['format'];
                                $editable = $row['editable'];
                                $row_id = $id;
                                $cell_value = $field_value = $form_data['OmcCustomersCredit'][$field];
                                if(is_numeric($field_value)){
                                    $format_type = $format;
                                    $decimal_places = 0;
                                    if($format == 'float'){
                                        $decimal_places = 2;
                                        $format_type = 'money';
                                    }
                                    if($format_type !=''){
                                        $cell_value = $this->App->formatNumber($cell_value,$format_type,$decimal_places);
                                    }
                                }
                                ?>
                                <tr data-id="<?php echo $row_id ;?>">
                                    <td style="width: 100px;" data-editable="no"><?php echo $header ;?></td>
                                    <td style="width: 100px;" data-editable="<?php echo $editable ;?>" data-field="<?php echo $field ;?>" data-value="<?php echo $field_value ;?>" width="50%"><?php echo $cell_value ;?></td>
                                    <td style="width: 50px;" data-editable="no">
                                        <?php
                                            if($editable == 'yes'){
                                        ?>
                                                <a href="javascript:void(0);" class="inline-row-edit isb-edit"> &nbsp;&nbsp;&nbsp;&nbsp;</a>
                                        <?php
                                            }
                                        ?>

                                    </td>
                                </tr>
                            <?php
                            }
                        ?>
                    </tbody>
                </table>
                </div>
            </div>
        </div>

    </div>

    <div class="dr"><span></span></div>

</div>


<!-- URLs -->
<input type="hidden" id="form-save-url" value="<?php echo $this->Html->url(array('controller' => 'OmcCustomerDailySales', 'action' => 'customers_credit')); ?>" />

<!-- Le Script -->
<script type="text/javascript">
    var permissions = <?php echo json_encode($permissions); ?>;
    var table_setup = <?php echo json_encode($table_setup); ?>;
</script>
<?php
    echo $this->Html->script('scripts/omc_customer/rule_actions.js');
    echo $this->Html->script('scripts/omc_customer/dsrp_common.js');
    echo $this->Html->script('scripts/omc_customer/customers_credit.js');
?>
