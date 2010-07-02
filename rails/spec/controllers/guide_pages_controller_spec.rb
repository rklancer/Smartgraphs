require 'spec_helper'

describe GuidePagesController do

  def mock_guide_page(stubs={})
    @mock_guide_page ||= mock_model(GuidePage, stubs)
  end

  describe "GET index" do
    it "assigns all guide_pages as @guide_pages" do
      GuidePage.stub(:find).with(:all).and_return([mock_guide_page])
      get :index
      assigns[:guide_pages].should == [mock_guide_page]
    end
  end

  describe "GET show" do
    it "assigns the requested guide_page as @guide_page" do
      GuidePage.stub(:find).with("37").and_return(mock_guide_page)
      get :show, :id => "37"
      assigns[:guide_page].should equal(mock_guide_page)
    end
  end

  describe "GET new" do
    it "assigns a new guide_page as @guide_page" do
      GuidePage.stub(:new).and_return(mock_guide_page)
      get :new
      assigns[:guide_page].should equal(mock_guide_page)
    end
  end

  describe "GET edit" do
    it "assigns the requested guide_page as @guide_page" do
      GuidePage.stub(:find).with("37").and_return(mock_guide_page)
      get :edit, :id => "37"
      assigns[:guide_page].should equal(mock_guide_page)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created guide_page as @guide_page" do
        GuidePage.stub(:new).with({'these' => 'params'}).and_return(mock_guide_page(:save => true))
        post :create, :guide_page => {:these => 'params'}
        assigns[:guide_page].should equal(mock_guide_page)
      end

      it "redirects to the created guide_page" do
        GuidePage.stub(:new).and_return(mock_guide_page(:save => true))
        post :create, :guide_page => {}
        response.should redirect_to(guide_page_url(mock_guide_page))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved guide_page as @guide_page" do
        GuidePage.stub(:new).with({'these' => 'params'}).and_return(mock_guide_page(:save => false))
        post :create, :guide_page => {:these => 'params'}
        assigns[:guide_page].should equal(mock_guide_page)
      end

      it "re-renders the 'new' template" do
        GuidePage.stub(:new).and_return(mock_guide_page(:save => false))
        post :create, :guide_page => {}
        response.should render_template('new')
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested guide_page" do
        GuidePage.should_receive(:find).with("37").and_return(mock_guide_page)
        mock_guide_page.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :guide_page => {:these => 'params'}
      end

      it "assigns the requested guide_page as @guide_page" do
        GuidePage.stub(:find).and_return(mock_guide_page(:update_attributes => true))
        put :update, :id => "1"
        assigns[:guide_page].should equal(mock_guide_page)
      end

      it "redirects to the guide_page" do
        GuidePage.stub(:find).and_return(mock_guide_page(:update_attributes => true))
        put :update, :id => "1"
        response.should redirect_to(guide_page_url(mock_guide_page))
      end
    end

    describe "with invalid params" do
      it "updates the requested guide_page" do
        GuidePage.should_receive(:find).with("37").and_return(mock_guide_page)
        mock_guide_page.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :guide_page => {:these => 'params'}
      end

      it "assigns the guide_page as @guide_page" do
        GuidePage.stub(:find).and_return(mock_guide_page(:update_attributes => false))
        put :update, :id => "1"
        assigns[:guide_page].should equal(mock_guide_page)
      end

      it "re-renders the 'edit' template" do
        GuidePage.stub(:find).and_return(mock_guide_page(:update_attributes => false))
        put :update, :id => "1"
        response.should render_template('edit')
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested guide_page" do
      GuidePage.should_receive(:find).with("37").and_return(mock_guide_page)
      mock_guide_page.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the guide_pages list" do
      GuidePage.stub(:find).and_return(mock_guide_page(:destroy => true))
      delete :destroy, :id => "1"
      response.should redirect_to(guide_pages_url)
    end
  end

end
