/**
 * viewCalendarViewModel.
 *
 * Module that represents the viewModel of the calendar page
 */
var viewCalendarViewModel = (function () {
  // Private objects and functions

  // Model of the calendar page
  var calendarModel = new ViewCalendarModel();

  /**
   * showLoader()
   *
   * @param {Boolean} show
   *
   * show/hide loader of page
   */
  function showLoader(show) {
    if (show) {
      document.getElementById("pageContent").style.display = "none";
      document.getElementById("loader").style.display = "block";
    } else {
      document.getElementById("loader").style.display = "none";
      document.getElementById("pageContent").style.display = "block";
    }
  }

  // Bind observables to elements(observers)
  function bind() {
    // Get DOM Elements
    let campusesViewElement = document.getElementById("campuses");

    // instantiate new Observer class
    const campusesObserver = new Observable(); // campuses observable

    /**
     * updateCampus()
     *
     * @param {String} campus
     *
     * observable function that will be called on notify
     */
    const updateCampus = (campus) => {
      hideError();
      calendarModel.fillCampus(campus);
      generateCalendar();
    };

    // subscribe to some observers
    campusesObserver.subscribe(updateCampus);

    // notify all observers about new data on event
    // Campus input observer
    campusesViewElement.addEventListener("change", () => {
      campusesObserver.notify(campusesViewElement.value);
    });
  }

  /**
   * hideError()
   *
   * hides error on the input fields
   */
  function hideError() {
    sharedHelpersInstance.hideErrorInput(document.getElementById("campuses"));
  }

  /**
   * generateCalendar()
   *
   * Generates a time table based on the user input
   */
  function generateCalendar() {
    let table = [];
    let dateArray = [];
    let model = calendarModel.getCurrentObj();
    let campus = model.campus;
    let rooms = model.rooms;
    let courses = model.courses;
    let teachers = model.teachers;
    let classes = model.classes;

    if (
      campus.length > 0 &&
      rooms.length > 0 &&
      courses.length > 0 &&
      teachers.length > 0 &&
      classes.length > 0
    ) {
      // Filter courses by campus
      let filteredCourses = courses.filter(function (item) {
        return item.campus == model.campus;
      });

      // Filter rooms by campus
      let filteredRooms = rooms.filter(function (item) {
        return item.campus == model.campus;
      });

      // Filter class by filtered courses
      let filteredClasses = [];
      for (const item of filteredCourses) {
        for (const classItem of classes) {
          if (item.classId == classItem._id) {
            filteredClasses.push(classItem);
          }
        }
      }

      // Filter teacher by filtered courses
      let filteredTeachers = [];
      for (const item of filteredCourses) {
        for (const teacherItem of teachers) {
          if (teacherItem.courseId == item._id) {
            filteredTeachers.push(teacherItem);
          }
        }
      }

      if (filteredClasses.length == 0) {
        alert("You need to associate a class with a course");
        location.reload();
        return;
      } else if (filteredTeachers.length == 0) {
        alert("You need to associate a teacher with a course");
        location.reload();
        return;
      } else {
        // Remove all undefined dates
        let classesArray = [];
        for (const item of filteredClasses) {
          if (
            !(item.dateStart == undefined || isNaN(new Date(item.dateStart)))
          ) {
            classesArray.push(item);
          }
        }
        if (classesArray.length == 0) {
          alert("You need to associate a date with a class");
          location.reload();
          return;
        }
        // Sort classes y date
        let sortedClasses = classesArray.sort(
          (class1, class2) =>
            new Date(class1.dateStart) - new Date(class2.dateStart)
        );

        for (let i = 0; i < sortedClasses.length; i++) {
          let dateTemp = new Date(sortedClasses[i].dateStart);
          let date =
            dateTemp.getFullYear() +
            "-" +
            (dateTemp.getMonth() + 1) +
            "-" +
            dateTemp.getDate();

          let time = `${new Date(
            sortedClasses[i].dateStart
          ).getHours()}:${new Date(
            sortedClasses[i].dateStart
          ).getMinutes()} -- ${new Date(
            sortedClasses[i].dateFinish
          ).getHours()}:${new Date(sortedClasses[i].dateFinish).getMinutes()}`;

          let courseId = "";
          for (const course of filteredCourses) {
            if (course.classId == sortedClasses[i]._id) {
              courseId = course._id;
              break;
            }
          }

          if (sharedHelpersInstance.isEmpty(courseId)) {
            alert("You need to associate a class with a course");
            location.reload();
            return;
          }

          let teacherId = "";
          let teacherName = "";
          for (const teacher of filteredTeachers) {
            if (teacher.courseId == courseId) {
              teacherId = teacher._id;
              teacherName = teacher.name;
            }
          }

          if (
            sharedHelpersInstance.isEmpty(teacherId) ||
            sharedHelpersInstance.isEmpty(teacherName)
          ) {
            alert("You need to associate a teacher with a course");
            location.reload();
            return;
          }

          // If date is included add the class to the class array else add the date
          if (dateArray.includes(date)) {
            for (let i = 0; i < table.length; i++) {
              let roomItem = "";
              for (let room of filteredRooms) {
                let number = Number(room.capacity);
                let students = Number(sortedClasses[i].numberOfStudents);
                if (!isNaN(number) && !isNaN(students)) {
                  if (number >= students) {
                    roomItem = room.name;
                  }
                } else {
                  alert(strings.somethingWentWrong);
                  location.reload();
                  return;
                }
              }
              if (sharedHelpersInstance.isEmpty(roomItem)) {
                alert(
                  "No room capacity, Please add a room with enough capacity"
                );
                location.reload();
                return;
              }
              if (table[i].date == date) {
                table[i].classes.push({
                  class: sortedClasses[i]._id,
                  className: sortedClasses[i].code,
                  time: time,
                  teacher: teacherId,
                  teacherName: teacherName,
                  room: roomItem,
                });
              }
            }
          } else {
            let roomItem = "";
            for (let room of filteredRooms) {
              let number = Number(room.capacity);
              let students = Number(sortedClasses[i].numberOfStudents);
              if (!isNaN(number) && !isNaN(students)) {
                if (number >= students) {
                  roomItem = room.name;
                }
              } else {
                alert(strings.somethingWentWrong);
                location.reload();
                return;
              }
            }
            if (sharedHelpersInstance.isEmpty(roomItem)) {
              alert("No room capacity, Please add a room with enough capacity");
              location.reload();
              return;
            }
            dateArray.push(date);
            table.push({
              date: date,
              classes: [
                {
                  class: sortedClasses[i]._id,
                  className: sortedClasses[i].code,
                  time: time,
                  teacher: teacherId,
                  teacherName: teacherName,
                  room: roomItem,
                },
              ],
            });
          }
        }
        showCalendar(table);
      }
    } else {
      if (campus.length <= 0) {
        alert("Please add a campus");
      } else if (rooms.length <= 0) {
        alert("Please add a room");
      } else if (courses.length <= 0) {
        alert("Please add a course");
      } else if (teachers.length <= 0) {
        alert("Please add a teacher");
      } else {
        alert("Please add a class");
      }
      location.reload();
    }
  }

  /**
   * draw the time table html
   *
   * @param {Array} table
   */
  function showCalendar(table) {
    let times = document.getElementById("time-interval");
    let days = document.getElementById("week-names");
    console.log(table);
    let firstRow = "";
    let classes = [];
    let numberOfColumns = 0;
    for (let row of table) {
      let classTemp = [];
      for (let item of row.classes) {
        firstRow = firstRow + `<div>${item.time}</div>`;
        classTemp.push(item);
        numberOfColumns++;
      }
      classes.push(classTemp);
    }
    times.innerHTML = firstRow;

    let firstColumn = "";
    for (let row of table) {
      firstColumn = firstColumn + `<div>${row.date}</div>`;
    }
    days.innerHTML = firstColumn;

    let content = document.getElementById("content");
    let contentHtml = "";
    for (let row of classes) {
      if (row.length < numberOfColumns) {
        let count = 0;
        for (let cell of row) {
          count++;
          contentHtml =
            contentHtml +
            `<div class="cell"><b>Class</b>: ${cell.className}, <b>Teacher</b>: ${cell.teacherName}, <b>Room</b>: ${cell.room}</div>`;
        }
        while (count < numberOfColumns) {
          contentHtml = contentHtml + `<div class-"cell"></div>`;
          count++;
        }
      }
    }
    content.innerHTML = contentHtml;

    document
      .getElementById("content")
      .style.setProperty(
        "grid-template-rows",
        "repeat(" + table.length + ", 1fr)"
      );
    document
      .getElementById("content")
      .style.setProperty(
        "grid-template-columns",
        "repeat(" + numberOfColumns + ", 1fr)"
      );

    document
      .getElementById("time-interval")
      .style.setProperty("grid-template-rows", "repeat(" + 1 + ", 1fr)");
    document
      .getElementById("time-interval")
      .style.setProperty(
        "grid-template-columns",
        "repeat(" + table.length + ", 1fr)"
      );

    document
      .getElementById("week-names")
      .style.setProperty(
        "grid-template-rows",
        "repeat(" + numberOfColumns + ", 1fr)"
      );
    document
      .getElementById("week-names")
      .style.setProperty("grid-template-columns", "repeat(" + 1 + ", 1fr)");
  }

  // Return an object exposed to the public
  return {
    /**
     * onLoad()
     *
     * This function in called when the page loads
     */
    onLoad: async function () {
      let model = calendarModel.getCurrentObj();
      await getCampuses(showLoader, model);
      await getClasses(showLoader, model);
      await getCourses(showLoader, model);
      await getTeachers(showLoader, model);
      await getRooms(showLoader, model);

      const formFactory = new FormFactory();
      document.getElementById("formFactory").innerHTML = formFactory.createForm(
        formType.calendar
      );
      var iterator = new Iterator(model.campuses);
      let options = "";
      iterator.each(function (item) {
        options = options + `<option id=${item._id}>${item.name}</option>`;
      });
      document.getElementById("campuses").innerHTML =
        document.getElementById("campuses").innerHTML + options;
      bind();
    },
  };
})();
