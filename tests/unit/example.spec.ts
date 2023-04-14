import { shallowMount } from "@vue/test-utils";
import MainComponent from "@/components/MainComponent.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(MainComponent, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
