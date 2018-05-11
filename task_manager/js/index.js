

/*========Custom Javascript=========*/

"use strict";

$(function () {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyATBzhrvdNitgt_9KZ6ApfcX4JGw4i5oXk",
        authDomain: "task-manager-daec3.firebaseapp.com",
        databaseURL: "https://task-manager-daec3.firebaseio.com",
        projectId: "task-manager-daec3",
        storageBucket: "",
        messagingSenderId: "695930356067"
    };
    firebase.initializeApp(config);

    console.log(firebase);

    var database = firebase.database();
    var saveTask = database.ref('Taskmanager');

    
    // ==== Card Section

    var card_section = "<div class='col-sm-4 col-lg-4 col-xs-12'><div class='card' ><span class='glyphicon glyphicon-remove removeTask'></span><div class='card_body' contenteditable='true'></div></div></div>";
    var Card_content = $('.append_card').html();

    var cont;
    var GetCard_index;
    var GetCard_edit_index;

    
    // $(".card_body[contenteditable=true]").focus(function() {

    $('.task_manager_section').delegate('.card_body[contenteditable=true]', 'focus', function () {
        cont=$(this).html();
        console.log("Before " +cont);
    });

    $('.task_manager_section').delegate('.card_body[contenteditable=true]', 'blur', function () {
        // console.log("After " +cont);

        if ($(this).html() != cont) {
           //Here you can write the code to run when the content change

            cont=$(this).html();
            console.log('Card content changed = ' + cont);
            
            // Saving data to firebase

            var data = {
                task: 'Task',
                task_description: cont 
            }

            // Pushing data to firebase

            //saveTask.push(data);
            saveTask.push(data, finished);
            function finished(error) {
              if (error) {
                console.log('ooops');
              } else {
                console.log('data saved!');
              }
            }

        }else if($(this).html() == cont){

            cont=$(this).html();
            console.log('Card content not changed = ' + cont);
            
            // Saving data to firebase if change

            // var data = {
            //     task: 'Task',
            //     task_description: cont 
            // }

            // Pushing data to firebase

            // saveTask.push(data, finished);
            // function finished(error) {
            //   if (error) {
            //     console.log('ooops');
            //   } else {
            //     console.log('data saved!');
            //   }
            // }
        }           
    });

    // Showing data from firebase database

    saveTask.on("value", gotData, errData);

    function gotData(data) {

      var focused_edit;

      var Content_blank = $('.append_card').html('');
      var Taskmanager = data.val();

      // Grab the keys to iterate over the object
      var keys = Object.keys(Taskmanager);

      console.log(keys);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        // Look at each Taskmanager object!
        //var Taskmanager = Taskmanager[key];
        
        var Get_task = Taskmanager[key].task;
        var Get_task_description = Taskmanager[key].task_description;



        console.log(Get_task , Get_task_description);

        var card_section_edit = "<div class='col-sm-4 col-lg-4 col-xs-12'><div class='card' ><span class='glyphicon glyphicon-remove removeTask'></span><span class='glyphicon glyphicon-pencil editing " +Get_task+ "'></span><div class='card_body_edit' contenteditable='true'>" +Get_task_description+ "</div></div></div>";
        $(Content_blank).append(card_section_edit);

        $('.editing.showedit').next().focus();

      }

      // Edit card 

      $('.card_body_edit').on('focus', function () {

        var GetCard_edit_index = $(this).parent().parent().index();
        console.log("focused " + GetCard_edit_index);

        var Edit_card_key = keys[GetCard_edit_index];
        console.log("focused " + Edit_card_key);

        focused_edit = 'showedit';
        console.log("what is the state" + focused_edit);
        // replace myFirebase.set(...); with the next line
        //saveTask.child(Edit_card_key).update({task:focused_edit});

        saveTask.child(Edit_card_key).update({task:focused_edit}).then (function () {
            console.log("Updated hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");

            var task_vaue = Taskmanager[Edit_card_key].task;
            console.log("hello i am here " + task_vaue);
            
        }).catch(function (error) {
            console.log(error);
        })

      });

      $('.card_body_edit').on('blur', function () {
        
        focused_edit = 'noedit';
        var GetCard_edit_index = $(this).parent().parent().index();
        console.log(GetCard_edit_index);

        var edited_content = $(this).html();

        var Edit_card_key = keys[GetCard_edit_index];
        console.log(Edit_card_key);

        saveTask.child(Edit_card_key).update({task_description:edited_content, task:focused_edit}).then (function () {
            console.log("Updated");
        }).catch(function (error) {
            console.log(error);
        })
      })

      

      // Remove Card...
      
      $('.removeTask').on('click', function () {

        var GetCard_index = $(this).parent().parent().index();
        // console.log(GetCard_index);
        // $(this).parent().parent().remove();
        var Single_key = keys[GetCard_index];
        console.log(Single_key);

        saveTask.child(Single_key).remove().then (function () {
            console.log("Removed");
        }).catch(function (error) {
            console.log(error);
        })

      });



    }
 
    function errData(error) {
        console.log('Error!');
        console.log(error);
    }


    $('.add_card').click(function () {
        console.log('Clicked');
        $('.append_card').append(card_section);     // Append new elements
        $('.card_body').focus();
    });

    // Remove Card...
    // $('.task_manager_section').delegate('.removeTask', 'click', function () {
    //     var saveTask = database.ref('Taskmanager');
    //     saveTask.child(task_description).remove().then (function () {
    //         console.log("Removed");
    //     }).catch(function (error) {
    //         console.log("Removed failed");
    //     })

    //     // console.log($(this).Get_task);
    //     console.log('Clicked Remove Task');
    //     $(this).parent().parent().remove();
    // });

    
});

