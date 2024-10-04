<script setup lang="ts"></script>

<template>
  <div class="user-file-input flex gap-4">
    <div class="user-file-input--input">
      <input accept="image/*" id="avatar" type="file"/>
      <label for="avatar">
        <img src="/placeholder-avatar.jpg" alt="avatar"/>
      </label>
    </div>
    <div class="flex flex-col items-start user-file-input--info">
      <span>Завантажити фото</span>
      <p>
        Рекомендуємо додати реальне фото. Це підвищить довіру інших користувачів до вас.
      </p>
    </div>
  </div>
</template>


<style scoped>
  .user-file-input {
    width: 100%;
    height: 100%;
  }

  .user-file-input--input{
    position: relative;  
    width: 100px;
    height: 100px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    border: 4px solid var(--v-border);    
  }

  .user-file-input--input input{
    display: none;
  }

  .user-file-input--input label{
    width: 100%;
    height: 100%;
    display: inline-block;
    cursor: pointer;
  }

  .user-file-input--input label img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-file-input--info{
    max-width: 400px;
    span{
      color: var(--v-primary-text);
      font-weight: 500;
      font-size: 24px;
    }

    p{
      color: var(--v-secondary-text);
    }
  }
</style>