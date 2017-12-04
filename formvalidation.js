(function($){
	function Field(name, label, element){
		this.name = name;
		this.label = label;
		this.rules = [];
		this.element = element;
		this.errors = [];
		this.messages = {
				"required": "The {field} field is required.",
				"min_length": "The {field} field must be more than {val} characters long.",
				"max_length": "The {field} field must be less than {val} characters long.",
				"exact_length": "The {field} field must be exactly {val} characters long.",
				"alpha": "The {field} field can only contain alphabetical characters.",
				"alpha_numeric": "The {field} field can only contain alphanumeric characters.",
				"alpha_numeric_spaces": "The {field} field can only contain alphanumeric characters and spaces.",
				"alpha_numeric_dashes": "The {field} field can only contain alphanumeric characters and dashes.",
				"is_numeric": "The {field} field can only contain numeric characters.",
				"valid_email": "The {field} field must contain a valid email address.",
				"valid_url": "The {field} field must contain a valid URL.",
				"matches": "The {field} field must contain the same value as the {val} field!",
				"regex": "The {field} field is in an invalid format."
		}
		this.validate = function(){ 
			var field = this;
			$.each(this.rules, function(key, rule){
				console.log(field.element.data('validate').includes("required"));
				if(field.element.val() === '' && !field.element.data('validate').includes("required")){
					return true;
				}
				var result = window[rule._function](...[field.element.val(), rule._length]);
				var msg = field.getMessage(rule._function, rule._length);
				if(!result){
					if(!field.errors.includes(msg)){
						field.errors.push(msg);
					}
				} else {
					field.errors = $.grep(field.errors, function(value) {
					  return value != msg;
					});
				}
			})
		} 
		this.getMessage = function(rule, length){
			var output = this.messages[rule].replace("{field}", this.label.text());
			if(typeof length !== 'undefined' && length != null)
				output = output.replace("{val}", length);
			return output;
		}
		this.populateError = function(){
			this.element.addClass('is-invalid').removeClass('is-valid');
			if(this.element.parent().find('div[class="invalid-feedback"]').length > 0){
				this.element.parent().find('div[class="invalid-feedback"]').first().text(this.errors[0]);
			} else {
				var errorDiv = $('<div></div>').addClass('invalid-feedback').text(this.errors[0]);
				this.element.parent().append(errorDiv);
			}
		}
		this.removeError = function(){
			this.element.addClass('is-valid').removeClass('is-invalid');
			if(this.element.parent().find('div[class="invalid-feedback"]').length > 0){
				this.element.parent().find('div[class="invalid-feedback"]').first().remove();
			}
		}
		var rules = this.element.data('validate').split('|');  //0=min_length[4], 1=min_length, 2=4
		for(var i = 0; i < rules.length; i++){
			var rule = rules[i].match(/(\w+)\s?(?:\[([^\]]+)\])?/)
			this.rules.push({
					_function: rule[1],
					_length: Number(rule[2]),
					message: this.getMessage(rule[1], rules[2]),
					value: this.element.val()
			});
		}
	}
	fields = [];
	$('[data-validate]').each(function(index, value){
		var field = new Field(
				$(this).attr("name"), 
				$(this).parent().find('label').first(),
				$(this)
		);
		field.element.on('input', function(){
			field.validate();
			if(field.errors.length > 0){
				field.populateError();
			} else {
				field.removeError();
			}
		})
		fields.push(field);
	});
	$(document).on('click', '[data-submit]', function(e){
		var errorCount = 0;
		$.each(fields, function(k, field){
			field.validate();
			if(field.errors.length > 0){
				field.populateError();
				errorCount++;
			} else {
				field.removeError();
			}
		})
		if(errorCount > 0){
			alert("You have some fields that need tending to.");
		} else {
			$(this).closest('form').submit();
		}
		e.preventDefault();
	});
	window.required = function(str){
		return str.length > 0;
	}
	window.min_length = function(str, val){
		return val <= str.length;
	}
	window.max_length = function(str, val){
		return val >= str.length;
	}
	window.exact_length = function(str, val){
		return val == str.length;
	}
	window.alpha = function(str){
		return /^[a-zA-Z]+$/.test(str);
	}
	window.alpha_numeric = function(str){
		return (/^[a-zA-Z0-9]+$/.test(str));
	}
	window.alpha_numeric_spaces = function(str){
		return (/^[a-zA-Z ]+$/.test(str));
	}
	window.alpha_numeric_dashes = function(str){
		return /^[a-zA-Z-]+$/.test(str);
	}
	window.is_numeric = function(str){
		return /^[0-9]+$/.test(str);
	}
	window.valid_email = function(str) {
		 var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(str);
	}
	window.valid_url = function(str){
		var reg = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(reg);
	     return regex.test(str);    
	}
	window.matches = function(str, val){
		return str == $('input[name="'+val+'"]').val();
	}
	window.regex = function(str, val){
		var reg = new RegExp("["+val+"]+");
		return reg.test(str);
	}
	
})(jQuery);

