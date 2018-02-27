# jQuery-Form-Validation
A JavaScript form validation library that doesn't require any knowledge of JS to use!

Live Demo - http://demos.scotthlacey.com/form-validation

<p>This form validation library was created for people that don't know any sort of JavaScript at all or for those that don't want any JS in their HTML code. It is designed to work with BootStrap forms and its error display.</p>
<p>All you need to do to make this work is to add a data-validate attribute to any form text field. Inside this attribute, you assign rules to your field along with any parameters it might need.</p>
<h1>Example</h1>

```
<form action="#" method="POST">
  <div class="form-group">
    <label for="email" class="control-label">Email Address</label>
    <input type="email" name="email" class="form-control" data-validate="required|valid_email">
  </div>
  <div class="form-group">
    <label for="password" class="control-label">Password</label>
    <input type="password" name="password" class="form-control" data-validate="required|min_length[8]|max_length[64]|alpha_numeric">
  </div>
  <div class="form-group">
    <label for="confirm_password" class="control-label">Confirm Password</label>
    <input type="password" name="confirm_password" class="form-control" data-validate="required|matches[password]">
  </div>
  <div class="form-group">
    <label for="text" class="control-label">Display Name</label>
    <input type="text" name="display_name" class="form-control" data-validate="required|alpha_numeric_dashes">
  </div>
  <div class="form-group">
    <button type="submit" class="btn btn-primary" data-submit>Submit</button>
  </div>
</form>
```
<p>The code will iterate through all fields that have the data-validate attribute and will determine if the fields pass all the rules that were assigned to it. Rules are separated with a pipe(|) and parameters are determined by any value contained inside two square braces ([) and (]). Not all rules require parameters. Refer to the rule list below. Once the status of your field is determined, a DIV tag containing the appropriate message will be inserted into the input's parent div.  Bootstrap is not required, per se. As long as your form follows the 

```
<div><label><input></div>
```

nesting structure, it will work fine.</p>

<h2>Rechecking Before Submission</h2>

<p>If you add "data-submit" to whichever element you use to submit the form, the script will revalidate all fields. If there are still errors, it will cancel form submission and will alert the user. If there are no errors, the form will be submitted.</p>

```
<button type="submit" class="btn btn-primary" data-submit>Submit</button>
```

<h1>Styling Input Errors</h1>
<p>If you're not using Bootstrap, you'll need to add some styling to your form to get the correct colors to appear when a field is valid or invalid...</p>

```
.is-valid {
  border: 1px solid green;
}

.is-invalid {
  border: 1px solid red;
}

.invalid-feedback {
  color: red;
  font-weight: bold;
}
```
<h2>All rules must return true for the field to be valid.</h2>
<ul>
<li><b>required:</b> retruns true if the value entered is blank.</li>
<li><b>min_length[n]:</b> returns true if the length of the value entered is greater than  or equal to n</li>
<li><b>max_length[n]:</b> returns true if the length of the value entered is less than or equal to n</li>
<li><b>exact_length[n]</b>: returns true if the length of the value entered is exactly n</li>
<li><b>alpha:</b> returns true if the value entered is comprised of only aphabetical characters.</li>
<li><b>alpha_numeric:</b> returns true if the value entered is comprised of only alphbetical and numeric characters.</li>
<li><b>alpha_numeric_dashes:</b> returns true if the value entered is comprised of only alphanumeric characters and dashes(-).</li>
<li><b>alpha_numeric_spaces:</b> returns true if the value entered is comprised of only alphanumeric characters and spaces.</li>
<li><b>is_numeric:</b> returns true if the value entered is comprised of only numeric characters.</li>
<li><b>valid_email:</b> returns true if the value entered is a valid email address.</li>
<li><b>valid_url:</b> returns true if the value entered is a valid URL(http or https is required)</li>
<li><b>matches[in]:</b> returns true if the value entered is equal to the value of in where in is the name of another input field.</li>
</ul>

<h1>Installation</h1>
<p>This library currently requires jQuery to use. A vanilla version may be developed in the future if there is demand for it.</p>
<p>If you already have jQuery included at the bottom of your HTML page, add the following before the end of your BODY tag</p>

```
<script src="path/to/your/js/formvalidation.js"></script>
```

<p>If you haven't included jQuery, add the following before the end of your BODY tag</p>

```
<script
  src="https://code.jquery.com/jquery-1.12.4.js"
  integrity="sha256-Qw82+bXyGq6MydymqBxNPYTaUXXq7c8v3CwiYwLLNXU="
  crossorigin="anonymous"></script>
<script src="path/to/your/js/formvalidation.js"></script>
```

<h1>Conclusion</h1>
<p>There you have it, folks! Let me know if you have any ideas for more rules!</p>
<p>Happy coding!</p>
