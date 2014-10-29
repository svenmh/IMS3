IMS.Interaction_type=function(data){
  this.data=data;
}

/*
 * Really static, but not to be called by an instance.
 */


// When we change what interaction type we are changeing.
IMS.Interaction_type.fieldsets=function(sel){
  var val=$(this).val();
  IMS.asyncItem
  (IMS.Interaction_type,val,
   function(datum){
     var me=new IMS.Interaction_type(datum[0]);
     me.fieldsets();
   });
}


/*
 * static
 */

IMS.Interaction_type.prototype=new IMS._table();
IMS.Interaction_type.prototype._const={
  table:'interaction_types',
  primary_col:'interaction_type_id',
  html_class:'interaction_types'
}


/*
 * nonstatic
 */


IMS.Interaction_type.prototype.html=function(){
  return this.data.interaction_type_name;
}

// Numbers in the list returned by this function are
// participant_role_id as defined in the participant_roles table, from
// the Particiant.sql file.
IMS.Interaction_type.prototype.roles=function(){
  switch(this.data.interaction_type_name){
    case('Complex'):
    return [1]; // unspecified
    break;
    case('Protein-Protein'):
    return [2,3]; // bait, hit
  }
  alert('Unknown participant_type selected.');
}


IMS.Interaction_type.prototype.fieldsets=function(){
  var cols=[$('fieldset.colA'),$('fieldset.colB')];
  var roles=this.roles();

  for(var i in cols){
    var col=cols[i];

    if(roles[i]){
      var pk=roles[i];
      IMS.asyncItem(IMS.Participant_role,pk,function(datum){
        r=new IMS.Participant_role(datum[0]);
        col.attr('disabled',false);
        col.attr('id','col_' + r.primary_id());
        col.find('legend').text(r.html());
      })

    }else{
      col.attr('disabled',true);
      col.removeAttr('id');
      col.find('legend').text('unused');
    }
  }

}
