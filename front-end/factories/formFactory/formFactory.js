/**
 * FormFactory()
 *
 * Creates forms to show to the user using the 'Factory' pattern
 */
function FormFactory() {
  // Create form function that returns the form based on the type passed
  this.createForm = function (type) {
    var form;
    switch (type) {
      case formType.login:
        form = new LoginForm();
        break;
      case formType.signUp:
        form = new SignUpForm();
        break;
      case formType.addRoom:
        form = new AddRoomForm();
        break;
      case formType.addCampus:
        form = new AddCampusForm();
        break;
      case formType.addCourse:
        form = new AddCourseForm();
        break;
      case formType.addTeacher:
        form = new AddTeacherForm();
        break;
      case formType.addClass:
        form = new AddClassForm();
        break;
      case formType.associateCourseTeacher:
        form = new AssociateCourseTeacherForm();
        break;
      case formType.associateClassCourse:
        form = new AssociateClassCourseForm();
        break;
      case formType.associateDateClass:
        form = new AssociateDateClassForm();
        break;
      case formType.calendar:
        form = new CalendarForm();
        break;
      default:
        break;
    }
    return form.getForm();
  };
}
