<template>
  <div class="background">
    <WorkHistoryTable  :work-history-items="workHistoryItems"/>
    <EducationHistoryTable :academic-history-items="academicHistoryItems" />
  </div>
</template>

<script>
// @ is an alias to /src
import WorkHistoryTable from "@/components/WorkHistoryTable";
import workHistoryItems from "@/constants/workHistoryItems";
import EducationHistoryTable from "@/components/EducationHistoryTable";
import academicHistoryItems from "@/constants/academicHistoryItems";

export default {
  name: 'BackgroundView',
  components: {
    EducationHistoryTable,
    WorkHistoryTable
  },
  data() {
    return {
      workHistoryItems,
      academicHistoryItems
    }
  },
  async mounted() {
    let academicRecords = await this.getHistoryItems();
    if(academicRecords !== null && academicRecords.length > 0) {
      this.academicHistoryItems = academicRecords;
    }
  },
  methods: {
    getHistoryItems: async () => {
      const response = await fetch("https://leandro-hurtado-portfolio-api.glitch.me/academicRecords");
      if(response.ok) {
        return response.json();
      }
      return null;
    },
  }
}
</script>

<style>

.background {
  padding-bottom: 2em;
  padding-left: 2em;
}

table {
  font-family: "Century Gothic", CenturyGothic, sans-serif;
  border-collapse: collapse;
  margin-right: auto;
  width: 95%;
}


tr {
  background-color: #f1fff1;
  border: 1px solid #000000;
  display: block;
  margin-bottom: 1em;
}

/* For mobile we don't display thead, we will modify this when we add @media */
thead {
  display: none;
}

/* Relative width defined for images in a table cell */
td img {
  width: 10em;
}

/* Nice formatting for a column header */
th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}

/* Common formatting for both elements th and td */
th, td {
  border-style: none;
  border-color: black;
  padding: 1.125em 0.625em;
  text-align: center;
  display: table-cell;
}

/* Format for table cells values */
td {
  border-bottom-color: #ddd;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  display: block;
  font-size: .8em;
  text-align: right;
}

/*
    Synthetic pre-content for every td column to show the data-label attribute
    for every td element, this is for a nice format in mobile devices and have
    an easier table-like visualization in smaller screens
 */
td::before {
  content: attr(data-label);
  float: left;
  font-weight: bold;
  text-transform: uppercase;
}

/* For the last table data, we don't use border at the bottom */
td:last-child {
  border-bottom: 0;
}

.multiline-data-entry {
  margin-top: 2em;
}


@media (min-width: 800px) {
  /* Below we format tables for a behavior more appealing to laptops and computers */

  /* Every table row should be displayed as default instead of mobile-like */
  tr {
    display: table-row;
    margin-bottom: 0;
  }

  /* We now display table headers for this type of @media */
  thead {
    display: table-header-group;
  }

  /* We now use a border style for all th and td elements */
  th, td {
    border-style: solid;
  }

  /* For these kinds of data entry we don't put  */
  .multiline-data-entry {
    margin-top: 0;
  }

  /* For table columns we format different colors and sizes */
  td {
    border-bottom-color: #000;
    display: table-cell;
    font-size: medium;
    text-align: center;
  }

  /*
      As we are now visualizing as a normal table, we do not display the data-label attribute
      for each column, as our table is more conventional for this @media
   */
  td::before {
    display: none;
  }
}

</style>