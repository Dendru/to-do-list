<template></template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          title: "Сделать работу по дому",
          description: "Пропылесосить квартиру",
          date: "10.10.2025",
          completed: true,
          checked: false,
        },
        {
          title: "Написать пет проект для фронтенда",
          description: "",
          date: "10.10.2025",
          completed: false,
          checked: false,
        },
        {
          title: "Написать второй пет проект для фронтенда",
          description:
            "Хочу сделать проект, который будет не стыдно представить на собеседовании и показать HR ",
          date: "10.10.2025",
          completed: false,
          checked: false,
        },
      ],
    };
  },
};
</script>

<style>
</style>