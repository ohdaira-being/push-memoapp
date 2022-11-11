new Vue({
  el: "#app",
  data: {
    newhead: "",
    newcomment: "",
    memos: [],
    addmemoform: false,
    editedhead: "",
    editedcomment: "",
    editonly: false,
  },

  watch: {
    newhead: {
      handler: function (newhead) {
        const parsed = JSON.stringify(newhead);
        localStorage.setItem("newhead", parsed);
      },
      deep: true,
    },
    newcomment: {
      handler: function (newcomment) {
        const parsed = JSON.stringify(newcomment);
        localStorage.setItem("newcomment", parsed);
      },
      deep: true,
    },
    memos: {
      handler: function (memos) {
        const parsed = JSON.stringify(memos);
        localStorage.setItem("memos", parsed);
      },
      deep: true,
    },
    addmemoform: {
      handler: function (addmemoform) {
        const parsed = JSON.stringify(addmemoform);
        localStorage.setItem("addmemoform", parsed);
      },
      deep: true,
    },
    editedhead: {
      handler: function (editedhead) {
        const parsed = JSON.stringify(editedhead);
        localStorage.setItem("editedhead", parsed);
      },
      deep: true,
    },
    editedcomment: {
      handler: function (editedcomment) {
        const parsed = JSON.stringify(editedcomment);
        localStorage.setItem("editedcomment", parsed);
      },
      deep: true,
    },
    editonly: {
      handler: function (editonly) {
        const parsed = JSON.stringify(editonly);
        localStorage.setItem("editonly", parsed);
      },
      deep: true,
    },
  },

  mounted: function () {
    if (localStorage.getItem("newhead")) {
      try {
        this.newhead = JSON.parse(localStorage.getItem("newhead"));
      } catch (e) {
        localStorage.removeItem("newhead");
      }
    }
    if (localStorage.getItem("newcomment")) {
      try {
        this.newcomment = JSON.parse(localStorage.getItem("newcomment"));
      } catch (e) {
        localStorage.removeItem("newcomment");
      }
    }
    if (localStorage.getItem("memos")) {
      try {
        this.memos = JSON.parse(localStorage.getItem("memos"));
      } catch (e) {
        localStorage.removeItem("memos");
      }
    }
    if (localStorage.getItem("addmemoform")) {
      try {
        this.addmemoform = JSON.parse(localStorage.getItem("addmemoform"));
      } catch (e) {
        localStorage.removeItem("addmemoform");
      }
    }
    if (localStorage.getItem("editedhead")) {
      try {
        this.editedhead = JSON.parse(localStorage.getItem("editedhead"));
      } catch (e) {
        localStorage.removeItem("editedhead");
      }
    }
    if (localStorage.getItem("editedcomment")) {
      try {
        this.editedcomment = JSON.parse(localStorage.getItem("editedcomment"));
      } catch (e) {
        localStorage.removeItem("editedcomment");
      }
    }
    if (localStorage.getItem("editonly")) {
      try {
        this.editonly = JSON.parse(localStorage.getItem("editonly"));
      } catch (e) {
        localStorage.removeItem("editonly");
      }
    }
  },

  methods: {
    doaddmemo: function () {
      this.addmemoform = !this.addmemoform;
    },

    doaddmemoclear: function () {
      this.newhead = "";
      this.newcomment = "";
    },

    doadd: function () {
      if (this.newhead == "") {
        return;
      }
      this.memos.push({
        head: this.newhead,
        comment: this.newcomment,
        commenthead: this.newcomment.split("\n", 1)[0],
        denote: false,
        denotestop: false,
        edit: false,
        edithead: false,
        editcomment: false,
        memo: false,
      });
      this.newhead = "";
      this.newcomment = "";
    },

    dodenotetrue: function (item) {
      item.denote = true;
      item.denotestop = true;
      item.memo = true;
    },

    doeditscreen: function (item) {
      item.edit = !item.edit;
      item.denotestop = false;
      this.editonly = true;
    },

    stopeditscreen: function (item) {
      item.edit = !item.edit;
      item.denotestop = true;
      item.edithead = false;
      item.editcomment = false;
      this.editonly = false;
    },

    doremove: function (item) {
      var index = this.memos.indexOf(item);
      this.memos.splice(index, 1);
      this.editonly = false;
    },

    dodenotefalse: function (item) {
      item.denote = false;
      item.edit = false;
      item.denotestop = false;
      item.memo = false;
    },

    doedithead: function (item) {
      item.edithead = !item.edithead;
      this.editedhead = item.head;
    },

    savehead: function (item) {
      if (this.editedhead == "") {
        return;
      }
      item.head = this.editedhead;
      item.edithead = !item.edithead;
    },

    doclearedithead: function () {
      this.editedhead = "";
    },

    doeditcomment: function (item) {
      item.editcomment = !item.editcomment;
      this.editedcomment = item.comment;
    },

    savecomment: function (item) {
      item.comment = this.editedcomment;
      item.commenthead = this.editedcomment.split("\n", 1);
      item.editcomment = !item.editcomment;
    },

    docleareditcomment: function () {
      this.editedcomment = "";
    },
  },
});
