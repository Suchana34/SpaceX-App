<template>
    <ul>
    <!-- Post list items -->
    <li v-for="post in launchesPastQuery" :key="post.id">
        {{ post.mission_name }} by
        {{ post.rocket_name }}
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
    name: "Home",

  data: () => ({
      launchesPastQuery: []
  }),


  apollo: {
    launchesPastQuery:{
      query: {post}
    },
    
  variables: {
    limit: 10
   },
  },
  created() {
    this.$apollo.watchQuery({
      /* options */
    }).then(data => {
      console.log(data);
    });
  },

}

</script>