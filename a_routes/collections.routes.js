const express = require("express");
const router = express.Router();

const CollectionsService = require("../b_services/collections.service");
const collectionsService = new CollectionsService();

const Auth = require("./middleware/auth");
const { authMiddleware } = new Auth();

router.post("/", authMiddleware, collectionsService.createCollection); // 컬렉션 생성
router.get("/search", collectionsService.getCollectionsBySearch); // 검색어에 맞는 컬렉션 리스트
router.get("/", collectionsService.getAllCollectionsByCategoryId); // 카테고리에 포함된 컬렉션 목록 조회
router.get(
  "/mine",
  authMiddleware,
  collectionsService.getAllCollectionsByUserId
); // 내가 모은 컬렉션 목록 조회
router.put("/today", collectionsService.giveTodaysPopularCategories); // 컬렉션 좋아요 내림차순 10개까지 조회
router.get("/:collection_id", collectionsService.getCollection); // 컬렉션 상세 조회
router.put(
  "/:collection_id",
  authMiddleware,
  collectionsService.editCollection
); // 컬렉션 수정
router.delete(
  "/:collection_id",
  authMiddleware,
  collectionsService.deleteCollection
); // 컬렉션 삭제
router.put(
  "/like/:collection_id",
  authMiddleware,
  collectionsService.likeCollection
); // 컬렉션 좋아요 또는 좋아요 취소
router.put(
  "/:collection_id",
  authMiddleware,
  collectionsService.addVideoOnCollection
); // 컬렉션에 영상 추가,

module.exports = router;
