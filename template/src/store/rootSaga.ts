import { all } from "@redux-saga/core/effects";
import authenticatedSaga from "@/store/authenticated/saga";

export function* rootSaga() {
  yield all([
    ...authenticatedSaga
  ]);
}
