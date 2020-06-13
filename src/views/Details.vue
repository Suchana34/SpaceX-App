
<template>
    <ul v-if="launch">
    <!-- Post list items -->
    <li v-for="post in launchQuery" :key="post.id">
        {{ post.mission_name }} by
        {{ post.details }}
    </li>
    </ul>
</template>

<script>
import gql from 'graphql-tag';
  
const post =   gql`
    query pastLaunchesList($limit:Int!){
        launchesPast(limit: $limit) {
            id
            mission_name
            links{
                flickr_images
                mission_patch_small
            }
            rocket {
                rocket_name
            }
            launch_date_local
        }
    }`;

export default {
  name: "Details",

  data: () => ({
      launchQuery: []
  }),

  apollo: {
    launchQuery:{
       query: {post}
    }
  },
  created() {
    this.$apollo.fetch({
      /* options */
    }).then(data => {
      console.log(data);
    });
  },
}

</script>